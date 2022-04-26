import { useEffect, useState } from 'react'
import { isNil } from 'lodash'
import unkownIcon from './unkown-icon.png'

const CryptoIcon = ({ symbol, size }) => {
  const [iconUrl, setIconUrl] = useState('')

  useEffect(() => {
    if (!isNil(symbol)) {
      iconFetch(symbol)
    }
  }, [symbol])

  const iconFetch = async (symbol) => {
    await import(`../../node_modules/cryptocurrency-icons/svg/color/${symbol}.svg`)
      .then((data) => setIconUrl(data.default))
      .catch((err) => setIconUrl(unkownIcon))
  }

  return <img src={iconUrl} alt="" height={size} width={size} className={'m-1'} />
}

export default CryptoIcon
