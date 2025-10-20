import { useEffect, useState } from 'react';
import { byteConsoleLog } from '../../utils/consoleLogger';
import TiltedCard from '../../components/TiltedCard';
import { COLOR_SCHEMES } from '../../constants';
import { useSectionRegistration } from '../../hooks/useSectionRegistration';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  updated_at: string;
};

const PAGE_SIZE = 6;

const tagColors = COLOR_SCHEMES.map(scheme => scheme.tagColor);

function Projects() {
  // Register this section for navigation
  useSectionRegistration({ id: 'projects', label: 'Projects' });

  const [repos, setRepos] = useState<Repo[]>([]);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    let mounted = true;
    async function fetchRepos() {
      setLoading(true);
      setError(false);
      byteConsoleLog('<span class="c-verb">Loading GitHub Projects</span>', "warn");
      byteConsoleLog('<span class="c-verb">Request</span>: <span class="c-path">GET https://api.github.com/users/hitesh-2457/repos</span>', "warn");
      try {
        const res = await fetch('https://api.github.com/users/hitesh-2457/repos');
        if (!res.ok) throw new Error('Network');
        const data: Repo[] = await res.json();
        const filtered = data.filter(r => !r.fork)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        byteConsoleLog(`<span class="c-sec">GitHub Response</span>: <span class="c-note">${filtered.length} repositories loaded</span>`, "ok");
        if (mounted) {
          setRepos(filtered);
        }
      } catch (e) {
        byteConsoleLog('<span class="log-error">Error: Unable to fetch projects from GitHub</span>', "error");
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    // Defer fetch to ensure byteConsoleLog is initialized by Console
    setTimeout(() => {
      if (mounted) fetchRepos();
    }, 0);
    return () => { mounted = false; };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRepos([]);
    setShown(PAGE_SIZE);
    // trigger re-fetch
    (async () => {
      byteConsoleLog('<span class="c-verb">Request</span>: <span class="c-path">GET https://api.github.com/users/hitesh-2457/repos</span>', "warn");
      try {
        const res = await fetch('https://api.github.com/users/hitesh-2457/repos');
        if (!res.ok) throw new Error('Network');
        const data: Repo[] = await res.json();
        const filtered = data.filter(r => !r.fork)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        byteConsoleLog(`<span class="c-sec">Response</span>: <span class="c-note">${filtered.length} repositories loaded</span>`, "ok");
        setRepos(filtered);
      } catch (e) {
        byteConsoleLog('<span class="log-error">Error: Unable to fetch projects from GitHub</span>', "error");
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const renderRepoCard = (repo: Repo, idx: number) => {
    const tags: string[] = [];
    if (repo.language) tags.push(repo.language);
    if (Array.isArray(repo.topics)) tags.push(...repo.topics.slice(0, 2));
    const pretty = repo.name.replace(/-/g, ' ');

    // Get color scheme for this card
    const colorScheme = COLOR_SCHEMES[idx % COLOR_SCHEMES.length];
    const gradient = colorScheme.gradient;
    const accent = colorScheme.accent;

    const overlayContent = (
      <div className="relative w-full h-full bg-white rounded-3xl p-6 flex flex-col">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} grid place-items-center text-white mb-4 flex-shrink-0`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0,0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12 6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18 9.5 18.38,10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66,21.59 15.17,21.5C19.14,20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
          </svg>
        </div>
        <div className="flex-1 min-h-0">
          <h3 className="text-lg font-semibold capitalize text-slate-900 mb-2">{pretty}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{repo.description ? repo.description : 'Repository with no description.'}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t, i) => (
              <span key={i} className={`px-2.5 py-1 text-xs rounded-full ${tagColors[i % tagColors.length]}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <div
        key={repo.id}
        onClick={() => window.open(repo.html_url, '_blank', 'noopener')}
        style={{ cursor: 'pointer' }}
      >
        <TiltedCard
          imageSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          altText="GitHub repository"
          containerHeight="250px"
          containerWidth="100%"
          scaleOnHover={1.10}
          rotateAmplitude={12}
          showMobileWarning={false}
          overlayContent={overlayContent}
          displayOverlayContent={true}
          cardColor={colorScheme.spotlight}
          overlayBgColor={`linear-gradient(135deg, ${colorScheme.spotlight}, rgba(0, 0, 0, 0.3))`}
          accentColor={accent}
        />
      </div>
    );
  };

  const visibleRepos = repos.slice(0, shown);

  return (
  <section id="projects" className="min-h-screen flex items-center justify-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 allow-free-scroll">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold title-gradient-light">Featured Projects</h2>
          <p className="mt-3 text-slate-600">Latest repositories sourced with GitHub APIs.</p>
        </div>
        {loading && (
          <div id="projects-loading" className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-violet-600 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading projects from GitHub...</p>
          </div>
        )}
        {error && (
          <div id="projects-error" className="text-center py-12">
            <p className="text-red-600 font-semibold">Unable to load projects from GitHub.</p>
            <button
              id="retry-projects"
              className="btn-primary mt-4"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && repos.length === 0 && (
          <div id="projects-empty" className="text-center py-12">
            <p className="text-slate-600">No projects to show right now.</p>
          </div>
        )}
        {!loading && !error && repos.length > 0 && (
          <>
            <div id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleRepos.map(renderRepoCard)}
            </div>
            {shown < repos.length && (
              <div id="show-more-wrap" className="text-center mt-10">
                <button
                  id="show-more"
                  className="btn-primary"
                  onClick={() => setShown(s => Math.min(s + PAGE_SIZE, repos.length))}
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
