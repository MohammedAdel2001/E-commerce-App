import React from 'react'
import styles from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <div >
      <MainSlider/>
      <CategorySlider/>
      <FeatureProduct/>

      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
      </div>
  )
}
