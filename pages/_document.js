import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
   
  
    render() {
      return (
        <Html lang="en">
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <Head>
            <link  rel="icon" href="/images/favicon.svg" type="image/gif" sizes="16x16" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous" />
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
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument