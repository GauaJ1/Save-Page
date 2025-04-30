import React, { useContext, useState } from "react"
import './Sidebar.css'
import { assets } from '../../assets/assets'
import ContextProvider, { Context } from "../../context/context"
import Configuracoes from "./Config/Config"
import { SettingsContext } from "./Config/Context-Config"

const Sidebar = () => {

    const [extended, setAbrir] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const { showSettings, setShowSettings } = useContext(SettingsContext)
    const { onSent, prevPrompts, setRecentPrompt, newChat, savedPrompts } = useContext(Context)


    const RecentsPrompts = (prompt) => {
        onSent(prompt)
    }

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        newChat()


    }

    const toggleSettings = () => {
        setShowSettings(!showSettings)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setAbrir(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>Nova Conversa</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <p className="recent-title">Recente</p>
                        {savedPrompts.map((item, index) => {
                            return (
                                <div onClick={() => RecentsPrompts(item.userMessage)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.userMessage.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}

                    </div>
                    : null
                }

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Ajuda</p> : null}
                </div>
                <div className="bottom">
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extended ? <p>Atividade</p> : null}
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-item recent-entry" onClick={toggleSettings}>
                        <img src={assets.setting_icon} alt="" />
                        {extended ? <p>Configurações</p> : null}
                    </div>
                </div>
                {/*{showSettings && (
                    <div className="Aba">
                        <div className="bottom-item recent-entry">
                            <label className="switch">
                                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                                <span className="slider round"></span>
                            </label>
                            {extended ? <p>{darkMode ? 'Modo Escuro' : 'Modo Claro'}</p> : null}
                        </div>
                    </div>
                )}*/}

            </div>
        </div>
    )
}

export default Sidebar
