import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Leave = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLeaveType, setSelectedLeaveType] = useState('')
  
  const leaveTypes = [
    { id: 'CL', name: 'Casual Leave', balance: 6 },
    { id: 'SL', name: 'Sick Leave', balance: 4 },
    { id: 'PL', name: 'Privilege Leave', balance: 16.83 },
  ]

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leave Types */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Leave Balance</h2>
            <div className="space-y-4">
              {leaveTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedLeaveType(type.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedLeaveType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{type.name}</span>
                    <span className="text-sm bg-white px-2 py-1 rounded border">
                      {type.balance} days
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(day => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              
              {monthDays.map(day => {
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isCurrentDay = isToday(day)
                
                return (
                  <button
                    key={day.toString()}
                    className={`
                      aspect-square p-2 text-sm rounded-lg border
                      ${!isCurrentMonth ? 'text-gray-300' : ''}
                      ${isCurrentDay ? 'bg-primary-50 border-primary-200 font-semibold' : ''}
                      hover:bg-gray-50
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave