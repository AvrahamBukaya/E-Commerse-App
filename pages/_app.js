import '../styles/globals.css'
import Layout from './../components/Layout';
import { AuthProvider } from '../contexts/AuthContext'
import { Provider } from 'react-redux';
import { store } from './../redux/store';






function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <AuthProvider>
      <Layout>
        <div className='wrapper'>
          <Component {...pageProps} />
        </div>
      </Layout>
    </AuthProvider>
  </Provider>





}

export default MyApp
