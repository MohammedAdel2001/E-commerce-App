import React from 'react'
import styles from './Products.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import { Helmet } from 'react-helmet'
export default function Products() {
  return (
    <div>
      <FeatureProduct/>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
    </div>
  )
}
