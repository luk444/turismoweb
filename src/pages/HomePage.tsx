import { Hero } from '../components/home/Hero';
import { Benefits } from '../components/home/Benefits';
import { TourSearch } from '../components/home/TourSearch';
import { FeaturedTours } from '../components/home/FeaturedTours';
import { Hotels } from '../components/home/Hotels';
import { Categories } from '../components/home/Categories';
import { Testimonials } from '../components/home/Testimonials';
import { FinalCTA } from '../components/home/FinalCTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <TourSearch />
      <FeaturedTours />
      <Hotels />
      <Categories />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
