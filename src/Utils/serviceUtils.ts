export const isDevEnv = () => {
    if (process.env.REACT_APP_USE_DUMMY_DATA) {
        console.log('ENV: Development')
        return true
    } else {
        console.log('ENV: Production')
        return false
    }
}