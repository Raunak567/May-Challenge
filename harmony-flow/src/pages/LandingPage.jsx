import React, { useState } from 'react';

import ai_img from "../assets/AI_IMG.jpg"
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';


const LandingPage = () => {

  const Navigate = useNavigate()

  const [openAuthModal , setOpenAuthModal] = useState(false);
  const [currentPage, SetCurrentPage] = useState("login")

  const handleCTA = () => {};

  return (
    <div className="bg-[#0f0f13] text-[#f1f1f1] font-[Poppins]">
      {/* Navigation */}
      <nav className="glass-card fixed w-full z-50 border border-white/10 bg-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="music-wave mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="block w-1 bg-gradient-to-t from-[#6e00ff] to-[#ff00cc] rounded animate-wave"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></span>
                  ))}
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e00ff] to-[#ff00cc]">
                  Harmoniq
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium hover:text-purple-300">Features</a>
                <a href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium hover:text-purple-300">How It Works</a>
                <a href="#testimonials" className="px-3 py-2 rounded-md text-sm font-medium hover:text-purple-300">Testimonials</a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-4">
                <button className="text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:bg-opacity-5 transition"
                onClick={() => setOpenAuthModal(true)}>Login</button>
                <button className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                onClick={() => setOpenAuthModal(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Your Music, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6e00ff] to-[#ff00cc]">Enhanced</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Discover, organize, and experience music like never before with AI-powered recommendations and smart metadata tagging. Completely free.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition flex items-center justify-center"
          onClick={handleCTA}>
            <i className="fas fa-play mr-2"></i>
            Start Listening Now
          </button>
          <button className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-pink-400 hover:bg-opacity-20 transition flex items-center justify-center">
            <i className="fas fa-info-circle mr-2"></i> Learn More
          </button>
        </div>

        {/* Player Demo */}
        <div className="bg-white/10 backdrop-blur mt-20 p-6 rounded-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg relative">
                <img src="https://source.unsplash.com/random/400x400/?music,album" alt="Album cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold">Current Playlist</div>
                  <div className="text-purple-200 text-sm">AI Recommended Mix</div>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Cosmic Waves</span>
                  <span className="text-sm text-gray-400">3:42</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 text-gray-300">
                <i className="fas fa-random hover:text-white cursor-pointer"></i>
                <i className="fas fa-step-backward hover:text-white cursor-pointer"></i>
                <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] flex items-center justify-center text-white">
                  <i className="fas fa-pause"></i>
                </button>
                <i className="fas fa-step-forward hover:text-white cursor-pointer"></i>
                <i className="fas fa-redo hover:text-white cursor-pointer"></i>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-volume-down text-gray-400"></i>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Electronic', 'Chill', 'Ambient', 'Study'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-purple-900 bg-opacity-40 rounded-full text-xs hover:translate-y-[-2px] transition shadow-md">
                    {tag}
                  </span>
                ))}
                <button className="px-3 py-1 bg-gray-700 bg-opacity-40 rounded-full text-xs hover:bg-gray-600 flex items-center">
                  <i className="fas fa-plus mr-1"></i> Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Harmoniq combines cutting-edge technology with intuitive design to revolutionize your music experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-brain text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Music Recommendations</h3>
                <p className="text-gray-400">Our advanced AI learns your taste and suggests perfect tracks you'll love, even before you know you want them.</p>
            </div>
            
          
            <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-tags text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Tagging System</h3>
                <p className="text-gray-400">Organize your library with custom tags for mood, activity, or any category you choose. Auto-tagging available.</p>
            </div>
            
  
            <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-sliders-h text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Dynamic Sound Profiles</h3>
                <p className="text-gray-400">Adaptive audio processing that automatically adjusts EQ and effects based on genre, tags, and your preferences.</p>
            </div>
            
   
            <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-users text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborative Playlists</h3>
                <p className="text-gray-400">Create shared playlists with friends where everyone can add tracks and vote on what plays next.</p>
            </div>
            
               <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-moon text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sleep Timer & Fade</h3>
                <p className="text-gray-400">Fall asleep to your favorite music with customizable fade-out and automatic shut-off after your chosen duration.</p>
            </div>
            
    
            <div className="glass-card p-6 rounded-xl hover:bg-white hover:bg-opacity-10 transition">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400">Detailed insights into your listening habits, mood patterns, and musical preferences over time.</p>
            </div>
        </div>
    </section>

      {/* How It Works Section */}
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Harmoniq Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Three simple steps to transform your music experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Music</h3>
                <p className="text-gray-400">Link your existing music library from Spotify, Apple Music, or upload your own files. We support all major platforms.</p>
            </div>
            

            <div className="text-center">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Personalize Your Experience</h3>
                <p className="text-gray-400">Teach our AI your preferences by liking tracks, adding tags, and creating playlists. The more you use it, the smarter it gets.</p>
            </div>
            

            <div className="text-center">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Discover & Enjoy</h3>
                <p className="text-gray-400">Let Harmoniq surprise you with perfect recommendations and automatically organized playlists tailored to your current mood.</p>
            </div>
        </div>
        
        <div className="mt-16 glass-card p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4">AI That Understands Your Taste</h3>
                    <p className="text-gray-400 mb-6">Our proprietary machine learning algorithms analyze not just the musical characteristics of your favorite tracks, but also when and how you listen to them, creating a multidimensional understanding of your unique musical identity.</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag px-3 py-1 bg-purple-900 bg-opacity-40 rounded-full text-sm">Tempo Analysis</span>
                        <span className="tag px-3 py-1 bg-blue-900 bg-opacity-40 rounded-full text-sm">Harmonic Mapping</span>
                        <span className="tag px-3 py-1 bg-pink-900 bg-opacity-40 rounded-full text-sm">Mood Detection</span>
                        <span className="tag px-3 py-1 bg-yellow-900 bg-opacity-40 rounded-full text-sm">Context Awareness</span>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg">
                        <img 
                        src={ai_img}
                        alt="AI technology" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    </section>

       {/* Testimonials Section  */}
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of music lovers who transformed their listening experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                    <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                     alt="User" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <h4 className="font-semibold">Sarah Johnson</h4>
                        <div className="flex text-yellow-400 text-sm">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <p className="text-gray-300">"Harmoniq's AI recommendations are scarily accurate. It introduced me to my new favorite band before I even knew they existed!"</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="User" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <h4 className="font-semibold">Michael Chen</h4>
                        <div className="flex text-yellow-400 text-sm">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <p className="text-gray-300">"As a DJ, the tagging system has revolutionized how I organize my library. I can find the perfect track for any mood or crowd in seconds."</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/women/63.jpg" 
                    alt="User" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <h4 className="font-semibold">Emma Rodriguez</h4>
                        <div className="flex text-yellow-400 text-sm">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                </div>
                <p className="text-gray-300">"The collaborative playlists have brought my friend group closer together during lockdown. We take turns adding songs and it's become our virtual hangout."</p>
            </div>
        </div>
    </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Music Experience?</h2>
          <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8">Join Harmoniq today and discover music in a whole new way. No credit card required.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition">
              <i className="fas fa-user-plus mr-2"></i> Sign Up Free
            </button>
            <button className="bg-black bg-opacity-30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-40 transition">
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </button>
          </div>
        </div>
      </section>



    {/* Footer  */}
    <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center mb-4">
                    <div className="music-wave mr-2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span className="text-xl font-bold">Harmoniq</span>
                </div>
                <p className="text-gray-400 text-sm">Revolutionizing music discovery through AI and smart metadata.</p>
                <div className="flex mt-4 space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-tiktok"></i></a>
                </div>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                    <li><a href="#features" className="text-gray-400 hover:text-white text-sm">Features</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Apps</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Integrations</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Help Center</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Community</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2023 Harmoniq. All rights reserved. Music for everyone.</p>
        </div>
    </footer>


    {/* <Modal
      isOpen={openAuthModal}
      onclose={() => {
        setOpenAuthModal(false);
        SetCurrentPage("Login");
      }}
      hideHeader
      >
      <div>
        {currentPage === "Login" && (
          <Login SetCurrentPage={SetCurrentPage} />
        )}
        {currentPage === "signup" && (
          <signUp SetCurrentPage = {SetCurrentPage} />
        )}
        </div>
        </Modal> */}
      
    </div>
  );
};

export default LandingPage;
