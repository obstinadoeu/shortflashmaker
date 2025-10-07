"use client"

import { Download, Play, Share2, Eye } from 'lucide-react'

interface VideoResult {
  id: string
  title: string
  duration: string
  thumbnail: string
  size: string
}

interface ResultsProps {
  results: VideoResult[]
  onDownload: (id: string) => void
  onPreview: (id: string) => void
}

export default function Results({ results, onDownload, onPreview }: ResultsProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Seus Shorts estão prontos! 🎉
        </h3>
        <div className="text-sm text-gray-600">
          {results.length} shorts gerados
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <div className="aspect-[9/16] bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Play className="w-12 h-12 text-purple-600" />
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {result.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {result.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Tamanho: {result.size}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onPreview(result.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Prévia</span>
                </button>
                <button
                  onClick={() => onDownload(result.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Compartilhe seus shorts!
            </h4>
            <p className="text-sm text-gray-600">
              Publique no YouTube, TikTok, Instagram e outras plataformas
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors border">
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  )
}