import Axios from 'axios'
import React from 'react'

interface IUseFetch {
  loading: boolean
  error: boolean
}

interface IUseFetchObject<T> extends IUseFetch {
  data: T
  fetchData: (params?: Object) => Promise<T | undefined>
}

interface IUseFetchArray<T> extends IUseFetch {
  data: T[]
  fetchData: (params?: Object) => Promise<T[] | undefined>
}

export const useFetchObject = <IData>(
  URL: string,
  loadOnMount: boolean = false
): IUseFetchObject<IData> => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false)
  const [data, setData] = React.useState<IData>({} as IData)

  const fetchData = React.useCallback(
    async (params?: Object) => {
      setData({} as IData)
      setLoading(true)
      try {
        const response = await Axios.get<IData>(URL, {
          params: {
            ...params,
          },
        })
        setData(response.data)
        setLoading(false)
        return response.data
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    },
    [URL]
  )

  React.useEffect(() => {
    if (loadOnMount) {
      console.log('useEffect')
      fetchData()
    }
  }, [loadOnMount, fetchData])

  return { loading, error, data, fetchData }
}

export const useFetchArray = <IData>(
  URL: string,
  loadOnMount: boolean = false
): IUseFetchArray<IData> => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false)

  const [data, setData] = React.useState<IData[]>([])

  const fetchData = React.useCallback(
    async (params?: Object) => {
      setData([])
      setLoading(true)
      try {
        const response = await Axios.get<IData[]>(URL, {
          params: {
            ...params,
          },
        })
        setData(response.data)
        setLoading(false)
        return response.data
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    },
    [URL]
  )

  React.useEffect(() => {
    if (loadOnMount) fetchData()
  }, [loadOnMount, fetchData])

  return { loading, error, data, fetchData }
}
