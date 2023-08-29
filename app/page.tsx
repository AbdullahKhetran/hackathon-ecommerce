import MainSection from '@/components/MainSection'
import Promotion from '@/components/Promotion'
import FeaturedProduct from '@/components/FeaturedProduct'
import Jewellry from '@/components/Jewellry'
import Footer from '@/components/Footer/Footer'
import Newsletter from '@/components/Newsletter'
import Navbar from '@/components/Navbar/Navbar'
import Copyright from '@/components/Footer/Copyright'


export default function Home() {
  return (
    <div>
      <div className='max-w-center'>
        <Navbar />
        <MainSection />
        <Promotion />
        <FeaturedProduct />
        <Jewellry />
        <Newsletter />
        <Footer />
      </div>
      <div className='border border-t border-productSubtitle'></div>

      <div className='max-w-center'>
        <Copyright />
      </div>
    </div>
  )
}
