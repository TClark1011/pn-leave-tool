import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary:{main:"#004B8D"},
        secondary:{main:"#F2A900"},
    },
    typography:{
        fontFamily:[
            'Roboto',
            'sans-serif'
        ].join(','),
        fontSize:16,
        h1:{
            fontSize:"3em",
            fontWeight:600,
        },
        h2: {
            fontSize:"2em",
            fontWeight:500,
        },
    }
})

//# NOTES
//* Page Titles (eg; 'Login') use h2

export default theme
