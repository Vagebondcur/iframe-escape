'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CustomIframeDemoComponent() {
  const [iframeContent, setIframeContent] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const defaultContent = `
<html>
<body>
  <h2>Custom Iframe Content</h2>
  <p>This content can be modified to demonstrate various iframe breakout techniques.</p>
  <button onclick="window.parent.postMessage({type: 'BREAKOUT', message: 'Hello from the iframe!'}, '*')">
    Attempt Breakout
  </button>
  <script>
    // You can add more complex scripts here to demonstrate different techniques
  </script>
</body>
</html>
  `.trim()

  useEffect(() => {
    setIframeContent(defaultContent)

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'BREAKOUT') {
        setMessage(event.data.message)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const updateIframeContent = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (iframeContent !== defaultContent) {
        iframeRef.current.contentWindow.document.open()
        iframeRef.current.contentWindow.document.write(iframeContent)
        iframeRef.current.contentWindow.document.close()
      } else {
        iframeRef.current.src = '/exploit.html'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Custom Iframe Breakout Demo</CardTitle>
          <CardDescription>Experiment with custom HTML content in the iframe to demonstrate various breakout scenarios.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Parent Page</h2>
            <p className="text-sm text-gray-600 mb-2">Modify the HTML content below and update the iframe to test different breakout scenarios.</p>
            {message && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <p className="font-bold">Message from iframe:</p>
                <p>{message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Textarea
              value={iframeContent}
              onChange={(e) => setIframeContent(e.target.value)}
              className="w-full h-64 mb-2"
              placeholder="Enter custom HTML content for the iframe"
            />
            <Button onClick={updateIframeContent}>Update Iframe Content</Button>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full h-64 border-none"
              sandbox="allow-scripts allow-same-origin"
              id="escapeMe"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}