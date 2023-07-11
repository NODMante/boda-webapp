import ProtectedRoute from '@/tools/components/protected-route/protected-route'
import React from 'react'

const Dashboard = ({user}) => {
  return (
    <div className=" h-full">Dashboard</div>
  )
}

export default ProtectedRoute(Dashboard)
