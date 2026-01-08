import React from 'react'

const WhyChosesec = () => {
  return (
    <section className="py-5" style={{ background: "#ffffff" }}>
        <div className="container">
          <h2 className="text-center mb-3">Why Choose Smart LMS?</h2>
          <p className="text-center text-muted mb-5 fst-italic">
            Experience a smarter way to learn with features designed for every
            learner
          </p>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-award fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">Expert Instructors</h5>
                <p className="text-muted">
                  Learn from industry professionals with years of teaching and
                  real-world experience.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-play-circle fs-1 text-success mb-3"></i>
                <h5 className="fw-bold mb-2">Interactive Lessons</h5>
                <p className="text-muted">
                  Engaging videos, quizzes, assignments, and hands-on projects
                  to enhance your learning.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-phone fs-1 text-warning mb-3"></i>
                <h5 className="fw-bold mb-2">Learn Anywhere</h5>
                <p className="text-muted">
                  Access all courses on mobile, tablet, or desktop — learn at
                  your own pace, anytime.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-patch-check fs-1 text-danger mb-3"></i>
                <h5 className="fw-bold mb-2">Certificates of Completion</h5>
                <p className="text-muted">
                  Earn industry-recognized certificates to showcase your skills
                  and boost your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhyChosesec