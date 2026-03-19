import { useState } from 'react'

import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";

function App() {
  const [count, setCount] = useState(0)
  
 //const location = useLocation();
  //const hideNavbar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";
  return (
    <Router>
      <AppContent/>
     {/*  <div className="flex">
        
         <Navbar /> 
        {!hideNavbar && <Navbar />}
          <div className={`${!hideNavbar ? "ml-64" : ""} flex-1 flex flex-col min-h-screen `}>
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/add-pet" element={<PetForm />} />
                <Route path="/editPet/:id" element={<EditPet />} />
                <Route path="/pet/:id" element={<PetDetails />} />
                <Route path="/applications" element={<MyApplications />} />
                <Route path="/applications/dashboard" element={<ApplicationDashboard />} /> 

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/pets" element={<ProtectedRoute><Pets /></ProtectedRoute>}/>
                <Route path="/pet/:id" element={<ProtectedRoute><PetDetails /></ProtectedRoute>}/>
                <Route path="/add-pet" element={<ProtectedRoute role="shelter"><PetForm /></ProtectedRoute>}/>
                <Route path="/editPet/:id" element={<ProtectedRoute role="shelter"><EditPet /></ProtectedRoute>}/>
                <Route path="/applications/dashboard" element={ <ProtectedRoute role="shelter"><ApplicationDashboard /></ProtectedRoute>}/>
                <Route path="/applications" element={<ProtectedRoute role="adopter"><MyApplications /></ProtectedRoute>}/>
              </Routes>
            </main>
            <Footer />
          </div>
      </div> */}
    </Router>

  )
}

export default App
