import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddJobForm, setShowAddJobForm] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [newJob, setNewJob] = useState({
    company: '',
    role: '',
    status: 'applied',
    appliedDate: new Date().toISOString().split('T')[0],
    interviewDate: '',
    notes: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
    fetchJobs()
  }, [navigate])

  useEffect(() => {
    filterJobs()
  }, [jobs, selectedStatus])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false)
      }
    }

    if (showProfileDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showProfileDropdown])

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      } else {
        console.error('Failed to fetch jobs')
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    if (selectedStatus === 'all') {
      setFilteredJobs(jobs)
    } else {
      setFilteredJobs(jobs.filter(job => job.status === selectedStatus))
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      })
      
      if (response.ok) {
        const data = await response.json()
        setJobs([data, ...jobs])
        setNewJob({
          company: '',
          role: '',
          status: 'applied',
          appliedDate: new Date().toISOString().split('T')[0],
          interviewDate: '',
          notes: ''
        })
        setShowAddJobForm(false)
      }
    } catch (error) {
      console.error('Error adding job:', error)
    }
  }

  const handleUpdateJobStatus = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.ok) {
        const updatedJob = await response.json()
        setJobs(jobs.map(job => job._id === jobId ? updatedJob : job))
      }
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        
        if (response.ok) {
          setJobs(jobs.filter(job => job._id !== jobId))
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      case 'interview': return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      case 'offer': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusCount = (status) => {
    return jobs.filter(job => job.status === status).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-stone-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-stone-900">
      {/* Background Animation Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Job Application Dashboard</h1>
            
            {/* Profile Section */}
            <div className="relative z-30 profile-dropdown-container">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg p-2 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-red-500 rounded-full flex items-center justify-center font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-gray-300">{user?.email}</div>
                </div>
                <svg className={`w-4 h-4 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg shadow-2xl z-50 min-w-max">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-white mb-2">{jobs.length}</div>
            <div className="text-gray-300">Total Applications</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-rose-400 mb-2">{getStatusCount('applied')}</div>
            <div className="text-gray-300">Applied</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-amber-400 mb-2">{getStatusCount('interview')}</div>
            <div className="text-gray-300">Interviews</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-emerald-400 mb-2">{getStatusCount('offer')}</div>
            <div className="text-gray-300">Offers</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'applied', 'interview', 'offer', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && ` (${getStatusCount(status)})`}
                  {status === 'all' && ` (${jobs.length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {/* Timeline View Button */}
            <button
              onClick={() => alert('Feature coming out soon!')}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Timeline View</span>
            </button>

            {/* Add Job Button */}
            <button
              onClick={() => setShowAddJobForm(true)}
              className="bg-gradient-to-r from-rose-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-rose-700 hover:to-red-800 transition-all duration-300 shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {/* Add Job Form Modal */}
        {showAddJobForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Job Application</h2>
                <button
                  onClick={() => setShowAddJobForm(false)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Job Role</label>
                  <input
                    type="text"
                    required
                    value={newJob.role}
                    onChange={(e) => setNewJob({...newJob, role: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    placeholder="Enter job role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={newJob.status}
                    onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  >
                    <option value="applied" className="bg-gray-800">Applied</option>
                    <option value="interview" className="bg-gray-800">Interview</option>
                    <option value="offer" className="bg-gray-800">Offer</option>
                    <option value="rejected" className="bg-gray-800">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Applied Date</label>
                  <input
                    type="date"
                    value={newJob.appliedDate}
                    onChange={(e) => setNewJob({...newJob, appliedDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>

                {newJob.status === 'interview' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Interview Date</label>
                    <input
                      type="date"
                      value={newJob.interviewDate}
                      onChange={(e) => setNewJob({...newJob, interviewDate: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={newJob.notes}
                    onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    placeholder="Add any notes or comments"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddJobForm(false)}
                    className="flex-1 py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-red-700 text-white rounded-lg hover:from-rose-700 hover:to-red-800 transition-all cursor-pointer"
                  >
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">No Job Applications Found</h3>
                <p className="text-gray-300 mb-4">
                  {selectedStatus === 'all' 
                    ? "Start tracking your job applications by adding your first job!"
                    : `No jobs found with status "${selectedStatus}"`
                  }
                </p>
                <button
                  onClick={() => setShowAddJobForm(true)}
                  className="bg-gradient-to-r from-rose-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-rose-700 hover:to-red-800 transition-all cursor-pointer"
                >
                  Add Your First Job
                </button>
              </div>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                        <p className="text-gray-300">{job.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                      <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                      {job.interviewDate && (
                        <span>Interview: {new Date(job.interviewDate).toLocaleDateString()}</span>
                      )}
                      <span>Added: {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {job.notes && (
                      <p className="text-gray-300 text-sm">{job.notes}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={job.status}
                      onChange={(e) => handleUpdateJobStatus(job._id, e.target.value)}
                      className="px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer"
                    >
                      <option value="applied" className="bg-gray-800">Applied</option>
                      <option value="interview" className="bg-gray-800">Interview</option>
                      <option value="offer" className="bg-gray-800">Offer</option>
                      <option value="rejected" className="bg-gray-800">Rejected</option>
                    </select>
                    
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
