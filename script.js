// LinkHub Pro - Professional Link Management Platform JavaScript

class LinkHubPro {
    constructor() {
        this.data = this.loadData();
        this.analytics = this.loadAnalytics();
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.renderProfile();
        this.renderContactInfo();
        this.renderSocialMedia();
        this.renderStreaming();
        this.renderLinks();
        this.renderBusinessTools();
        this.renderAnalytics();
        this.applyTheme();
        this.setupEventListeners();
        this.updateStats();
        this.initializeAnimations();
    }

    // Data Management
    loadData() {
        const defaultData = {
            profile: {
                name: "Your Business Name",
                title: "Professional Title",
                bio: "Your professional bio goes here. Tell visitors about your business and what makes you unique.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
                verified: true
            },
            contact: {
                email: "contact@yourbusiness.com",
                phone: "+1 (555) 123-4567"
            },
            social: {
                instagram: {
                    url: "https://instagram.com/yourhandle",
                    handle: "@yourhandle",
                    followers: "12.5K",
                    posts: "892",
                    verified: false,
                    trending: true
                },
                youtube: {
                    url: "https://youtube.com/yourchannel",
                    handle: "Your Channel",
                    subscribers: "45.2K",
                    videos: "128",
                    verified: true,
                    trending: false
                },
                tiktok: {
                    url: "https://tiktok.com/@yourhandle",
                    handle: "@yourhandle",
                    followers: "89.3K",
                    likes: "2.1M",
                    verified: false,
                    trending: true
                },
                linkedin: {
                    url: "https://linkedin.com/in/yourprofile",
                    handle: "Your Name",
                    connections: "3.2K",
                    posts: "156",
                    verified: false,
                    professional: true
                }
            },
            streaming: {
                spotify: {
                    url: "https://open.spotify.com/artist/yourid",
                    type: "Artist Profile",
                    listeners: "234K"
                },
                apple: {
                    url: "https://music.apple.com/yourprofile",
                    type: "Music Library"
                },
                soundcloud: {
                    url: "https://soundcloud.com/yourhandle",
                    type: "Audio Tracks"
                }
            },
            links: [
                { 
                    title: "Official Website", 
                    url: "https://yourwebsite.com", 
                    icon: "fas fa-globe",
                    description: "Visit our main website"
                },
                { 
                    title: "Portfolio", 
                    url: "https://yourportfolio.com", 
                    icon: "fas fa-briefcase",
                    description: "View our work and projects"
                },
                { 
                    title: "Blog", 
                    url: "https://yourblog.com", 
                    icon: "fas fa-blog",
                    description: "Read our latest articles"
                }
            ],
            businessTools: {
                booking: {
                    url: "https://calendly.com/yourbusiness",
                    title: "Book Appointment",
                    description: "Schedule a consultation or meeting"
                },
                portfolio: {
                    url: "https://yourportfolio.com",
                    title: "Portfolio",
                    description: "View our work and case studies"
                },
                shop: {
                    url: "https://yourshop.com",
                    title: "Online Shop",
                    description: "Browse products and services"
                },
                newsletter: {
                    url: "https://yournewsletter.com",
                    title: "Newsletter",
                    description: "Subscribe for updates and news"
                }
            },
            theme: {
                primaryColor: "#1a1a1a",
                secondaryColor: "#4a4a4a",
                backgroundColor: "#fafafa"
            }
        };

        const savedData = localStorage.getItem('linkhubpro-data');
        return savedData ? JSON.parse(savedData) : defaultData;
    }

    loadAnalytics() {
        const defaultAnalytics = {
            totalClicks: 0,
            uniqueVisitors: 0,
            platformClicks: {},
            linkClicks: {},
            lastVisit: null,
            sessions: []
        };

        const savedAnalytics = localStorage.getItem('linkhubpro-analytics');
        return savedAnalytics ? JSON.parse(savedAnalytics) : defaultAnalytics;
    }

    saveData() {
        localStorage.setItem('linkhubpro-data', JSON.stringify(this.data));
    }

    saveAnalytics() {
        localStorage.setItem('linkhubpro-analytics', JSON.stringify(this.analytics));
    }

    // Loading Screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1000);
    }

    // Profile Rendering
    renderProfile() {
        const profileImg = document.getElementById('profile-img');
        const profileName = document.getElementById('profile-name');
        const profileTitle = document.getElementById('profile-title');
        const profileBio = document.getElementById('profile-bio');
        const verifiedBadge = document.getElementById('verifiedBadge');

        if (profileImg) profileImg.src = this.data.profile.image;
        if (profileName) profileName.textContent = this.data.profile.name;
        if (profileTitle) profileTitle.textContent = this.data.profile.title;
        if (profileBio) profileBio.textContent = this.data.profile.bio;
        if (verifiedBadge) {
            verifiedBadge.style.display = this.data.profile.verified ? 'flex' : 'none';
        }
    }

    // Contact Information Rendering
    renderContactInfo() {
        const contactEmail = document.getElementById('contactEmail');
        const contactPhone = document.getElementById('contactPhone');

        if (contactEmail) contactEmail.textContent = this.data.contact.email;
        if (contactPhone) contactPhone.textContent = this.data.contact.phone;
    }

    // Social Media Rendering
    renderSocialMedia() {
        // Instagram
        const instagramCard = document.querySelector('.instagram-card');
        if (instagramCard && this.data.social.instagram) {
            const handle = instagramCard.querySelector('.social-handle');
            const followersCount = instagramCard.querySelector('.social-stat:first-child .stat-count');
            const postsCount = instagramCard.querySelector('.social-stat:last-child .stat-count');
            
            if (handle) handle.textContent = this.data.social.instagram.handle;
            if (followersCount) followersCount.textContent = this.data.social.instagram.followers;
            if (postsCount) postsCount.textContent = this.data.social.instagram.posts;
        }

        // YouTube
        const youtubeCard = document.querySelector('.youtube-card');
        if (youtubeCard && this.data.social.youtube) {
            const handle = youtubeCard.querySelector('.social-handle');
            const subscribersCount = youtubeCard.querySelector('.social-stat:first-child .stat-count');
            const videosCount = youtubeCard.querySelector('.social-stat:last-child .stat-count');
            
            if (handle) handle.textContent = this.data.social.youtube.handle;
            if (subscribersCount) subscribersCount.textContent = this.data.social.youtube.subscribers;
            if (videosCount) videosCount.textContent = this.data.social.youtube.videos;
        }

        // TikTok
        const tiktokCard = document.querySelector('.tiktok-card');
        if (tiktokCard && this.data.social.tiktok) {
            const handle = tiktokCard.querySelector('.social-handle');
            const followersCount = tiktokCard.querySelector('.social-stat:first-child .stat-count');
            const likesCount = tiktokCard.querySelector('.social-stat:last-child .stat-count');
            
            if (handle) handle.textContent = this.data.social.tiktok.handle;
            if (followersCount) followersCount.textContent = this.data.social.tiktok.followers;
            if (likesCount) likesCount.textContent = this.data.social.tiktok.likes;
        }

        // LinkedIn
        const linkedinCard = document.querySelector('.linkedin-card');
        if (linkedinCard && this.data.social.linkedin) {
            const handle = linkedinCard.querySelector('.social-handle');
            const connectionsCount = linkedinCard.querySelector('.social-stat:first-child .stat-count');
            const postsCount = linkedinCard.querySelector('.social-stat:last-child .stat-count');
            
            if (handle) handle.textContent = this.data.social.linkedin.handle;
            if (connectionsCount) connectionsCount.textContent = this.data.social.linkedin.connections;
            if (postsCount) postsCount.textContent = this.data.social.linkedin.posts;
        }
    }

    // Streaming Platforms Rendering
    renderStreaming() {
        // Spotify
        const spotifyCard = document.querySelector('.spotify-card');
        if (spotifyCard && this.data.streaming.spotify) {
            const type = spotifyCard.querySelector('.streaming-type');
            const listenersCount = spotifyCard.querySelector('.streaming-stat .stat-count');
            
            if (type) type.textContent = this.data.streaming.spotify.type;
            if (listenersCount) listenersCount.textContent = this.data.streaming.spotify.listeners;
        }

        // Apple Music
        const appleMusicCard = document.querySelector('.apple-music-card');
        if (appleMusicCard && this.data.streaming.apple) {
            const type = appleMusicCard.querySelector('.streaming-type');
            if (type) type.textContent = this.data.streaming.apple.type;
        }

        // SoundCloud
        const soundcloudCard = document.querySelector('.soundcloud-card');
        if (soundcloudCard && this.data.streaming.soundcloud) {
            const type = soundcloudCard.querySelector('.streaming-type');
            if (type) type.textContent = this.data.streaming.soundcloud.type;
        }
    }

    // Links Rendering
    renderLinks() {
        const linksContainer = document.getElementById('links-container');
        if (!linksContainer) return;

        linksContainer.innerHTML = '';

        this.data.links.forEach((link, index) => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-item';
            linkElement.innerHTML = `
                <div class="link-icon">
                    <i class="${link.icon || 'fas fa-link'}"></i>
                </div>
                <div class="link-info">
                    <div class="link-title">${link.title}</div>
                    <div class="link-description">${link.description || ''}</div>
                </div>
                <div class="link-action">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            `;
            
            linkElement.addEventListener('click', () => this.handleLinkClick(link.url, 'link', index));
            linksContainer.appendChild(linkElement);
        });
    }

    // Business Tools Rendering
    renderBusinessTools() {
        // Booking
        const bookingCard = document.querySelector('.booking-card');
        if (bookingCard && this.data.businessTools.booking) {
            const title = bookingCard.querySelector('.tool-info h3');
            const description = bookingCard.querySelector('.tool-info p');
            const button = bookingCard.querySelector('.tool-btn');
            
            if (title) title.textContent = this.data.businessTools.booking.title;
            if (description) description.textContent = this.data.businessTools.booking.description;
            if (button) {
                button.addEventListener('click', () => {
                    this.handleLinkClick(this.data.businessTools.booking.url, 'tool', 'booking');
                });
            }
        }

        // Portfolio
        const portfolioCard = document.querySelector('.portfolio-card');
        if (portfolioCard && this.data.businessTools.portfolio) {
            const title = portfolioCard.querySelector('.tool-info h3');
            const description = portfolioCard.querySelector('.tool-info p');
            const button = portfolioCard.querySelector('.tool-btn');
            
            if (title) title.textContent = this.data.businessTools.portfolio.title;
            if (description) description.textContent = this.data.businessTools.portfolio.description;
            if (button) {
                button.addEventListener('click', () => {
                    this.handleLinkClick(this.data.businessTools.portfolio.url, 'tool', 'portfolio');
                });
            }
        }

        // Shop
        const shopCard = document.querySelector('.shop-card');
        if (shopCard && this.data.businessTools.shop) {
            const title = shopCard.querySelector('.tool-info h3');
            const description = shopCard.querySelector('.tool-info p');
            const button = shopCard.querySelector('.tool-btn');
            
            if (title) title.textContent = this.data.businessTools.shop.title;
            if (description) description.textContent = this.data.businessTools.shop.description;
            if (button) {
                button.addEventListener('click', () => {
                    this.handleLinkClick(this.data.businessTools.shop.url, 'tool', 'shop');
                });
            }
        }

        // Newsletter
        const newsletterCard = document.querySelector('.newsletter-card');
        if (newsletterCard && this.data.businessTools.newsletter) {
            const title = newsletterCard.querySelector('.tool-info h3');
            const description = newsletterCard.querySelector('.tool-info p');
            const button = newsletterCard.querySelector('.tool-btn');
            
            if (title) title.textContent = this.data.businessTools.newsletter.title;
            if (description) description.textContent = this.data.businessTools.newsletter.description;
            if (button) {
                button.addEventListener('click', () => {
                    this.handleLinkClick(this.data.businessTools.newsletter.url, 'tool', 'newsletter');
                });
            }
        }
    }

    // Analytics Rendering
    renderAnalytics() {
        const totalClicksElement = document.getElementById('totalClicksAnalytics');
        const uniqueVisitorsElement = document.getElementById('uniqueVisitors');
        const conversionRateElement = document.getElementById('conversionRate');
        const avgSessionElement = document.getElementById('avgSession');

        if (totalClicksElement) totalClicksElement.textContent = this.analytics.totalClicks;
        if (uniqueVisitorsElement) uniqueVisitorsElement.textContent = this.analytics.uniqueVisitors;
        if (conversionRateElement) {
            const rate = this.analytics.uniqueVisitors > 0 
                ? ((this.analytics.totalClicks / this.analytics.uniqueVisitors) * 100).toFixed(1)
                : 0;
            conversionRateElement.textContent = `${rate}%`;
        }
        if (avgSessionElement) {
            const avgTime = this.calculateAverageSessionTime();
            avgSessionElement.textContent = avgTime;
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Edit Toggle
        const editToggle = document.getElementById('editToggle');
        if (editToggle) {
            editToggle.addEventListener('click', () => this.toggleEditMode());
        }

        // Modal Controls
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeEditModal());
        }

        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveChanges());
        }

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefault());
        }

        // Social Media Links
        this.setupSocialMediaLinks();

        // Streaming Links
        this.setupStreamingLinks();

        // Contact Links
        this.setupContactLinks();

        // Modal Background Click
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeEditModal();
                }
            });
        }

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isEditMode) {
                this.closeEditModal();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
        });
    }

    setupSocialMediaLinks() {
        // Instagram
        const instagramBtn = document.querySelector('.instagram-card .social-btn');
        if (instagramBtn) {
            instagramBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.instagram.url, 'social', 'instagram');
            });
        }

        const instagramMessageBtn = document.querySelector('.instagram-card .message-btn');
        if (instagramMessageBtn) {
            instagramMessageBtn.addEventListener('click', () => {
                this.handleLinkClick(`https://instagram.com/direct/new/`, 'social', 'instagram_message');
            });
        }

        // YouTube
        const youtubeBtn = document.querySelector('.youtube-card .social-btn');
        if (youtubeBtn) {
            youtubeBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.youtube.url, 'social', 'youtube');
            });
        }

        const youtubeSubscribeBtn = document.querySelector('.youtube-card .subscribe-btn');
        if (youtubeSubscribeBtn) {
            youtubeSubscribeBtn.addEventListener('click', () => {
                this.handleLinkClick(`${this.data.social.youtube.url}?sub_confirmation=1`, 'social', 'youtube_subscribe');
            });
        }

        // TikTok
        const tiktokBtn = document.querySelector('.tiktok-card .social-btn');
        if (tiktokBtn) {
            tiktokBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.tiktok.url, 'social', 'tiktok');
            });
        }

        const tiktokFollowBtn = document.querySelector('.tiktok-card .follow-btn');
        if (tiktokFollowBtn) {
            tiktokFollowBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.tiktok.url, 'social', 'tiktok_follow');
            });
        }

        // LinkedIn
        const linkedinBtn = document.querySelector('.linkedin-card .social-btn');
        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.linkedin.url, 'social', 'linkedin');
            });
        }

        const linkedinMessageBtn = document.querySelector('.linkedin-card .message-btn');
        if (linkedinMessageBtn) {
            linkedinMessageBtn.addEventListener('click', () => {
                this.handleLinkClick(`${this.data.social.linkedin.url}/detail/contact-info/`, 'social', 'linkedin_message');
            });
        }
    }

    setupStreamingLinks() {
        // Spotify
        const spotifyBtn = document.querySelector('.spotify-card .streaming-btn');
        if (spotifyBtn) {
            spotifyBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.streaming.spotify.url, 'streaming', 'spotify');
            });
        }

        // Apple Music
        const appleMusicBtn = document.querySelector('.apple-music-card .streaming-btn');
        if (appleMusicBtn) {
            appleMusicBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.streaming.apple.url, 'streaming', 'apple');
            });
        }

        // SoundCloud
        const soundcloudBtn = document.querySelector('.soundcloud-card .streaming-btn');
        if (soundcloudBtn) {
            soundcloudBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.streaming.soundcloud.url, 'streaming', 'soundcloud');
            });
        }
    }

    setupContactLinks() {
        // Email
        const emailItem = document.querySelector('.email-item');
        if (emailItem) {
            emailItem.addEventListener('click', () => {
                this.handleLinkClick(`mailto:${this.data.contact.email}`, 'contact', 'email');
            });
        }

        // Phone
        const phoneItem = document.querySelector('.phone-item');
        if (phoneItem) {
            phoneItem.addEventListener('click', () => {
                this.handleLinkClick(`tel:${this.data.contact.phone}`, 'contact', 'phone');
            });
        }
    }

    // Link Click Handler
    handleLinkClick(url, type, identifier) {
        // Track analytics
        this.trackClick(type, identifier);
        
        // Open link
        if (url.startsWith('mailto:') || url.startsWith('tel:')) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }

        // Add visual feedback
        this.showClickFeedback();
    }

    // Analytics Tracking
    trackClick(type, identifier) {
        this.analytics.totalClicks++;
        
        if (!this.analytics.platformClicks[type]) {
            this.analytics.platformClicks[type] = {};
        }
        
        if (!this.analytics.platformClicks[type][identifier]) {
            this.analytics.platformClicks[type][identifier] = 0;
        }
        
        this.analytics.platformClicks[type][identifier]++;
        
        // Track session
        this.trackSession();
        
        this.saveAnalytics();
        this.updateStats();
    }

    trackSession() {
        const now = Date.now();
        const sessionId = this.getSessionId();
        
        if (!this.analytics.lastVisit || now - this.analytics.lastVisit > 30 * 60 * 1000) { // 30 minutes
            this.analytics.uniqueVisitors++;
        }
        
        this.analytics.lastVisit = now;
        
        if (!this.analytics.sessions.find(s => s.id === sessionId)) {
            this.analytics.sessions.push({
                id: sessionId,
                startTime: now,
                clicks: 0
            });
        }
        
        const session = this.analytics.sessions.find(s => s.id === sessionId);
        if (session) {
            session.clicks++;
            session.lastActivity = now;
        }
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('linkhubpro-session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('linkhubpro-session', sessionId);
        }
        return sessionId;
    }

    calculateAverageSessionTime() {
        const completedSessions = this.analytics.sessions.filter(s => s.lastActivity);
        if (completedSessions.length === 0) return '0s';
        
        const totalTime = completedSessions.reduce((sum, session) => {
            const duration = session.lastActivity - session.startTime;
            return sum + duration;
        }, 0);
        
        const avgTime = totalTime / completedSessions.length;
        const seconds = Math.floor(avgTime / 1000);
        
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    // Stats Update
    updateStats() {
        const totalLinksElement = document.getElementById('totalLinks');
        const totalClicksElement = document.getElementById('totalClicks');
        
        if (totalLinksElement) {
            const totalLinks = this.data.links.length + Object.keys(this.data.social).length + Object.keys(this.data.streaming).length;
            totalLinksElement.textContent = totalLinks;
        }
        
        if (totalClicksElement) {
            totalClicksElement.textContent = this.analytics.totalClicks;
        }
        
        this.renderAnalytics();
    }

    // Edit Mode Functions
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        
        const analyticsDashboard = document.getElementById('analyticsDashboard');
        if (analyticsDashboard) {
            analyticsDashboard.style.display = this.isEditMode ? 'block' : 'none';
        }
        
        if (this.isEditMode) {
            this.openEditModal();
        }
    }

    openEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.add('active');
            this.populateEditForm();
        }
    }

    closeEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.isEditMode = false;
    }

    populateEditForm() {
        // Profile Information
        const editName = document.getElementById('editName');
        const editTitle = document.getElementById('editTitle');
        const editBio = document.getElementById('editBio');
        const editImage = document.getElementById('editImage');
        
        if (editName) editName.value = this.data.profile.name;
        if (editTitle) editTitle.value = this.data.profile.title;
        if (editBio) editBio.value = this.data.profile.bio;
        if (editImage) editImage.value = this.data.profile.image;
        
        // Contact Information
        const editEmail = document.getElementById('editEmail');
        const editPhone = document.getElementById('editPhone');
        
        if (editEmail) editEmail.value = this.data.contact.email;
        if (editPhone) editPhone.value = this.data.contact.phone;
        
        // Social Media Links
        const editInstagram = document.getElementById('editInstagram');
        const editYouTube = document.getElementById('editYouTube');
        const editTikTok = document.getElementById('editTikTok');
        const editLinkedIn = document.getElementById('editLinkedIn');
        const editSpotify = document.getElementById('editSpotify');
        const editApple = document.getElementById('editApple');
        const editSoundCloud = document.getElementById('editSoundCloud');
        
        if (editInstagram) editInstagram.value = this.data.social.instagram.url;
        if (editYouTube) editYouTube.value = this.data.social.youtube.url;
        if (editTikTok) editTikTok.value = this.data.social.tiktok.url;
        if (editLinkedIn) editLinkedIn.value = this.data.social.linkedin.url;
        if (editSpotify) editSpotify.value = this.data.streaming.spotify.url;
        if (editApple) editApple.value = this.data.streaming.apple.url;
        if (editSoundCloud) editSoundCloud.value = this.data.streaming.soundcloud.url;
        
        // Theme
        const editPrimaryColor = document.getElementById('editPrimaryColor');
        const editSecondaryColor = document.getElementById('editSecondaryColor');
        
        if (editPrimaryColor) editPrimaryColor.value = this.data.theme.primaryColor;
        if (editSecondaryColor) editSecondaryColor.value = this.data.theme.secondaryColor;
    }

    saveChanges() {
        // Profile Information
        const editName = document.getElementById('editName');
        const editTitle = document.getElementById('editTitle');
        const editBio = document.getElementById('editBio');
        const editImage = document.getElementById('editImage');
        
        if (editName) this.data.profile.name = editName.value;
        if (editTitle) this.data.profile.title = editTitle.value;
        if (editBio) this.data.profile.bio = editBio.value;
        if (editImage) this.data.profile.image = editImage.value;
        
        // Contact Information
        const editEmail = document.getElementById('editEmail');
        const editPhone = document.getElementById('editPhone');
        
        if (editEmail) this.data.contact.email = editEmail.value;
        if (editPhone) this.data.contact.phone = editPhone.value;
        
        // Social Media Links
        const editInstagram = document.getElementById('editInstagram');
        const editYouTube = document.getElementById('editYouTube');
        const editTikTok = document.getElementById('editTikTok');
        const editLinkedIn = document.getElementById('editLinkedIn');
        const editSpotify = document.getElementById('editSpotify');
        const editApple = document.getElementById('editApple');
        const editSoundCloud = document.getElementById('editSoundCloud');
        
        if (editInstagram) this.data.social.instagram.url = editInstagram.value;
        if (editYouTube) this.data.social.youtube.url = editYouTube.value;
        if (editTikTok) this.data.social.tiktok.url = editTikTok.value;
        if (editLinkedIn) this.data.social.linkedin.url = editLinkedIn.value;
        if (editSpotify) this.data.streaming.spotify.url = editSpotify.value;
        if (editApple) this.data.streaming.apple.url = editApple.value;
        if (editSoundCloud) this.data.streaming.soundcloud.url = editSoundCloud.value;
        
        // Extract handles from URLs
        this.extractSocialHandles();
        
        // Theme
        const editPrimaryColor = document.getElementById('editPrimaryColor');
        const editSecondaryColor = document.getElementById('editSecondaryColor');
        
        if (editPrimaryColor) this.data.theme.primaryColor = editPrimaryColor.value;
        if (editSecondaryColor) this.data.theme.secondaryColor = editSecondaryColor.value;
        
        this.saveData();
        this.renderProfile();
        this.renderContactInfo();
        this.renderSocialMedia();
        this.renderStreaming();
        this.applyTheme();
        this.closeEditModal();
        this.showSuccessMessage('Changes saved successfully!');
    }

    extractSocialHandles() {
        // Instagram
        if (this.data.social.instagram.url) {
            const match = this.data.social.instagram.url.match(/instagram\.com\/@?([^\/\?]+)/);
            if (match) this.data.social.instagram.handle = '@' + match[1];
        }
        
        // TikTok
        if (this.data.social.tiktok.url) {
            const match = this.data.social.tiktok.url.match(/tiktok\.com\/@?([^\/\?]+)/);
            if (match) this.data.social.tiktok.handle = '@' + match[1];
        }
        
        // LinkedIn
        if (this.data.social.linkedin.url) {
            const match = this.data.social.linkedin.url.match(/linkedin\.com\/in\/([^\/\?]+)/);
            if (match) this.data.social.linkedin.handle = match[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            localStorage.removeItem('linkhubpro-data');
            localStorage.removeItem('linkhubpro-analytics');
            this.data = this.loadData();
            this.analytics = this.loadAnalytics();
            this.init();
            this.closeEditModal();
            this.showSuccessMessage('Reset to default successfully!');
        }
    }

    // Theme Application
    applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', this.data.theme.primaryColor);
        root.style.setProperty('--secondary-color', this.data.theme.secondaryColor);
        document.body.style.background = this.data.theme.backgroundColor;
    }

    // Visual Feedback
    showClickFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'click-feedback';
        feedback.innerHTML = '<i class="fas fa-check"></i> Link opened!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2s forwards;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 2500);
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 3s forwards;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 3500);
    }

    // Animations
    initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .click-feedback, .success-message {
                font-family: var(--font-primary);
                font-weight: 500;
                font-size: 0.875rem;
            }
        `;
        document.head.appendChild(style);
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.social-card, .streaming-card, .tool-card, .link-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Export/Import Functions
    exportData() {
        const exportData = {
            profile: this.data.profile,
            contact: this.data.contact,
            social: this.data.social,
            streaming: this.data.streaming,
            links: this.data.links,
            businessTools: this.data.businessTools,
            theme: this.data.theme
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'linkhubpro-backup.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                this.data = { ...this.data, ...importData };
                this.saveData();
                this.init();
                this.showSuccessMessage('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkHubPro();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}