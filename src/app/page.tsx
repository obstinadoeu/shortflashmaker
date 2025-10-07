"use client"

import { useState } from 'react'
import { Upload, Play, Scissors, Download, Sparkles, Clock, Video } from 'lucide-react'
import Results from '@/components/Results'

interface VideoResult {
  id: string
  title: string
  duration: string
  thumbnail: string
  size: string
}

export default function Home() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<VideoResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        setUploadedFile(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const processVideo = () => {
    setIsProcessing(true)
    // Simular processamento e gerar resultados
    setTimeout(() => {
      const mockResults: VideoResult[] = [
        {
          id: '1',
          title: 'Melhor Momento - Início Impactante',
          duration: '0:30',
          thumbnail: '',
          size: '2.1 MB'
        },
        {
          id: '2',
          title: 'Momento Viral - Clímax do Vídeo',
          duration: '0:45',
          thumbnail: '',
          size: '3.2 MB'
        },
        {
          id: '3',
          title: 'Final Épico - Call to Action',
          duration: '0:35',
          thumbnail: '',
          size: '2.8 MB'
        }
      ]
      setResults(mockResults)
      setIsProcessing(false)
      setShowResults(true)
    }, 3000)
  }

  const handleDownload = (id: string) => {
    // Simular download
    console.log('Baixando vídeo:', id)
  }

  const handlePreview = (id: string) => {
    // Simular preview
    console.log('Visualizando vídeo:', id)
  }

  const startNew = () => {
    setUploadedFile(null)
    setResults([])
    setShowResults(false)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ShortMaker
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Como Funciona</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Preços</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contato</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                Entrar
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transforme seus vídeos em
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                  Shorts Virais
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                IA avançada que identifica os melhores momentos do seu vídeo e cria shorts automaticamente. 
                Simples, rápido e profissional.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">IA Inteligente</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Processamento Rápido</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Video className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Qualidade HD</span>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="max-w-2xl mx-auto">
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Arraste seu vídeo aqui
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ou clique para selecionar um arquivo
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer inline-block"
                  >
                    Selecionar Vídeo
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Suporta MP4, MOV, AVI até 500MB
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {!isProcessing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Configurações</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Duração do Short</label>
                              <select className="w-full border rounded-lg px-3 py-2 text-sm">
                                <option>30 segundos</option>
                                <option>60 segundos</option>
                                <option>90 segundos</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Estilo</label>
                              <select className="w-full border rounded-lg px-3 py-2 text-sm">
                                <option>Automático</option>
                                <option>Dinâmico</option>
                                <option>Educativo</option>
                                <option>Entretenimento</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Prévia</h4>
                          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                            <Video className="w-8 h-8 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={processVideo}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <Sparkles className="w-5 h-5 inline mr-2" />
                        Gerar Shorts com IA
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Processando com IA...
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Analisando seu vídeo e criando shorts incríveis
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="max-w-6xl mx-auto">
              <Results 
                results={results}
                onDownload={handleDownload}
                onPreview={handlePreview}
              />
              
              <div className="text-center mt-8">
                <button
                  onClick={startNew}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Processar Novo Vídeo
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* How it Works - Only show when not showing results */}
      {!showResults && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como Funciona
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Três passos simples para transformar seus vídeos em shorts virais
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload</h3>
                <p className="text-gray-600">
                  Faça upload do seu vídeo longo. Suportamos os principais formatos.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. IA Processa</h3>
                <p className="text-gray-600">
                  Nossa IA identifica os melhores momentos e cria shorts automaticamente.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Download</h3>
                <p className="text-gray-600">
                  Baixe seus shorts prontos para publicar nas redes sociais.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ShortMaker</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Termos</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Suporte</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShortMaker. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}