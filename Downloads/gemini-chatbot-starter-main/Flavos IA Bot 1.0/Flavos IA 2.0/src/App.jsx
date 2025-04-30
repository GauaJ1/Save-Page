import React from 'react'
import ContextProvider from './context/context'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { SettingsProvider } from './components/Sidebar/Config/Context-Config'
import { DesabilitarNomeProvider } from './components/Sidebar/Config/DesabNameContext'
import { ResponseProvider } from './components/Sidebar/Config/RespostaTypeContext'

export const App = () => {
  return (
    <ResponseProvider>
      <DesabilitarNomeProvider>
        <SettingsProvider>
          <Sidebar />
          <Main />
        </SettingsProvider>
      </DesabilitarNomeProvider>
    </ResponseProvider>
  )
}
export default App