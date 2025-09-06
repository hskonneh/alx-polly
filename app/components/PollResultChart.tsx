'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { PollOption } from '@/lib/types'

interface PollResultChartProps {
  question: string
  options: PollOption[]
  totalVotes: number
}

const PollResultChart: React.FC<PollResultChartProps> = ({ question, options, totalVotes }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // Ensure data is defined
    const data = options.map(opt => opt.votes || 0)
    const labels = options.map(opt => opt.text)

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: options.map(opt => opt.text || ''),
        datasets: [{
          label: 'Votes',
          data: options.map(opt => opt.votes || 0),
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: question,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    })

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [question, options, totalVotes])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default PollResultChart
