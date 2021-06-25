import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
   
  
    render() {
      return (
        <Html lang="en">
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <Head>
            <link  rel="icon" href="/images/favicon.svg" />
            <link  rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
            <link  rel="stylesheet" href="/font/stylesheet.css" />
            <link  rel="stylesheet" href="/css/style.css" />
            <link  rel="stylesheet" href="/css/responsive.css" />
          </Head>
          <body>
            <Main />
            <NextScript />
            <script  src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
             <script src="/js/custom.js"></script>
             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> 
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument