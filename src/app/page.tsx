'use client'

import CategoriesSection from "./components/categoriesSection/categoriesSection";
import Header from "./components/header/header";
import HomeBannerSection from "./components/homeBannerSection/homeBannerSection";

export default function Home() {
  return (
    <>
      <Header/>
      <HomeBannerSection/>
      <CategoriesSection/>
    </>
  );
}
