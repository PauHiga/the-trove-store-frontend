# Installing Styled Components

(11/6/2023)
`npm install styled-components` throws this error:

    npm ERR! Cannot read properties of null (reading 'edgesOut')


Need to downgrade to 5.3.10 for now: `npm install "styled-components@5.3.10"`  
https://github.com/styled-components/styled-components/issues/3998

