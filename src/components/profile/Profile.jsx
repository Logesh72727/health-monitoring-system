import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X
} from 'lucide-react'
import './Profile.css'

const Profile = () => {
  const { currentUser } = useAuth()
  const { addNotification } = useNotification()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Patient',
    email: 'john.patient@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    dateOfBirth: '1965-03-15',
    emergencyContact: {
      name: 'Sarah Patient',
      relationship: 'Daughter',
      phone: '+1 (555) 987-6543'
    },
    medicalHistory: {
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg']
    }
  })

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      addNotification('Profile updated successfully', 'success')
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <h1>Patient Profile</h1>
          <p className="profile-subtitle">
            Manage patient information and medical details
          </p>
        </div>
        
        <button 
          onClick={handleEditToggle}
          className={`edit-btn ${isEditing ? 'editing' : ''}`}
        >
          {isEditing ? (
            <>
              <Save size={16} />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 size={16} />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="profile-content">
        {/* Personal Information */}
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">
                <User size={16} />
                <span>Full Name</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{formData.name}</div>
              )}
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <Mail size={16} />
                <span>Email Address</span>
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{formData.email}</div>
              )}
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <Phone size={16} />
                <span>Phone Number</span>
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{formData.phone}</div>
              )}
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <MapPin size={16} />
                <span>Address</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{formData.address}</div>
              )}
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <Calendar size={16} />
                <span>Date of Birth</span>
              </div>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="info-input"
                />
              ) : (
                <div className="info-value">
                  {new Date(formData.dateOfBirth).toLocaleDateString()} 
                  <span className="info-meta">
                    ({Math.floor((new Date() - new Date(formData.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years old)
                  </span>
                </div>
              )}
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <User size={16} />
                <span>Patient ID</span>
              </div>
              <div className="info-value">
                PAT-2024-001
                <span className="info-meta">Unique identifier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="profile-section">
          <h2>Emergency Contact</h2>
          <div className="emergency-contact">
            <div className="contact-card">
              <div className="contact-header">
                <User size={20} />
                <h3>Primary Emergency Contact</h3>
              </div>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">Name:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      className="contact-input"
                    />
                  ) : (
                    <span className="contact-value">{formData.emergencyContact.name}</span>
                  )}
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Relationship:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                      className="contact-input"
                    />
                  ) : (
                    <span className="contact-value">{formData.emergencyContact.relationship}</span>
                  )}
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      className="contact-input"
                    />
                  ) : (
                    <span className="contact-value">{formData.emergencyContact.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="profile-section">
          <h2>Medical Information</h2>
          <div className="medical-grid">
            <div className="medical-card">
              <h3>Medical Conditions</h3>
              <div className="medical-list">
                {formData.medicalHistory.conditions.map((condition, index) => (
                  <div key={index} className="medical-item">
                    <span className="condition-badge">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="medical-card">
              <h3>Allergies</h3>
              <div className="medical-list">
                {formData.medicalHistory.allergies.map((allergy, index) => (
                  <div key={index} className="medical-item">
                    <span className="allergy-badge">{allergy}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="medical-card">
              <h3>Current Medications</h3>
              <div className="medical-list">
                {formData.medicalHistory.medications.map((medication, index) => (
                  <div key={index} className="medical-item">
                    <span className="medication-badge">{medication}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Care Team */}
        <div className="profile-section">
          <h2>Care Team</h2>
          <div className="care-team">
            <div className="team-member">
              <div className="member-avatar">
                <User size={24} />
              </div>
              <div className="member-info">
                <h4>Dr. Sarah Johnson</h4>
                <p>Primary Care Physician</p>
                <span className="member-contact">sarah.johnson@medical.com</span>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <User size={24} />
              </div>
              <div className="member-info">
                <h4>Dr. Michael Chen</h4>
                <p>Cardiologist</p>
                <span className="member-contact">michael.chen@heartclinic.com</span>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <User size={24} />
              </div>
              <div className="member-info">
                <h4>Nurse Emily Davis</h4>
                <p>Home Care Nurse</p>
                <span className="member-contact">emily.davis@homecare.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="profile-section">
          <h2>Insurance Information</h2>
          <div className="insurance-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Insurance Provider</div>
                <div className="info-value">Medicare</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Policy Number</div>
                <div className="info-value">MED-123456789</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Group Number</div>
                <div className="info-value">GRP-987654</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Effective Date</div>
                <div className="info-value">January 1, 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile