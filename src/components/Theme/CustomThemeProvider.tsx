import { ThemeProvider } from 'styled-components'
import { selectTheme } from '../../redux/theme/selector'
import { useAppSelector } from '../../redux/hooks'



const CustomThemeProvider:React.FC = ({ children }) => {
  const theme = useAppSelector(selectTheme)
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
