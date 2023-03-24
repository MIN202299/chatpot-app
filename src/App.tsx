import { useState } from 'react'
import { chatApi } from './request'
import './App.css'

function App() {
  const [message, setMessage] = useState([
    {role: 'system', content: '你是一个有用的人工助手'}
  ])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  function handleInput(e) {
    setQuestion(e.target.value)
  }
  async function sendMessage() {
    if (loading) return;
    setLoading(true)
    const newMessage = [...message, {role: 'user', content: question}]
    try {
      const data: any = await chatApi.post('/message', newMessage)
      setMessage([...newMessage, data.choices[0].message])
      setQuestion('')
    } catch(e) {}
      finally {
        setLoading(false)
      }

  }
  return (
    <div className='m-chatpot'>
      <div className={loading ? 'm-loading' : 'm-hidden'}>正在生成。。。</div>
      { message.map((item, idx) => {
        return <p key={idx}><strong>{ item.role }:</strong>{ item.content }</p>
      }) }
      <div className='m-bottom'>
        <input type="text" onInput={handleInput} value={question} />
        <button onClick={sendMessage}>发送</button>
      </div>
    </div>
  )
}

export default App
