import React from 'react'

const useFetch = () => {
    const [data, setData] = React.useState()
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState()

    const request = React.useCallback(async (url, options) => {
        let response;
        let json;
        try {
            setError(null)
            setLoading(true)
            response = await fetch(url, options)
            json = await response.json()
            if (response.ok === false) throw new Error(json.message)
        } catch (error) {
            json = null
            setError(error.message)
        } finally {
            setData(json)
            setLoading(false)
            return { response, json }
        }
    }, [])

    return {
        data,
        loading,
        error,
        request
    }
}

export default useFetch