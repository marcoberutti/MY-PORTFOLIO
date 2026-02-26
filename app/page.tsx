import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getPortfolioData } from '@/lib/db';
import { fetchGitHubRepos } from '@/lib/github';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const data = await getPortfolioData();
  const repos = await fetchGitHubRepos(process.env.GITHUB_USERNAME || 'marcoberutti');

  return (
    <main className="min-h-screen">
      <Header />
      <Hero personalInfo={data.personalInfo} />
      
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Portfolio</h2>
          <Portfolio repos={repos} />
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
          <About education={data.education} workExperience={data.workExperience} />
        </div>
      </section>

      <section id="skills" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">My Skills</h2>
          <Skills skills={data.skills} />
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Contact email={data.personalInfo.email} />
        </div>
      </section>

      <Footer personalInfo={data.personalInfo} />
    </main>
  );
}
