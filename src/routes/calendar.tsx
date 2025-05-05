import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '../components/SEO/SEO'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FaCalendarDay } from 'react-icons/fa'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  // Add custom styling to highlight today's date and customize the today button
  const [notification, setNotification] = useState('');
  const notificationTimeoutRef = useRef(null);
  
  // Function to modify the today button after render
  const handleCalendarDidMount = (info) => {
    // Find the today button
    const todayButton = document.querySelector('.fc-today-button');
    if (todayButton) {
      // Check if icon already exists to prevent duplicates
      const existingIcon = todayButton.querySelector('svg');
      if (!existingIcon) {
        // Create the icon element
        const icon = document.createElement('span');
        icon.style.display = 'inline-block';
        icon.style.marginRight = '4px';
        icon.style.verticalAlign = 'middle';
        // White icon (fill="white")
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="white"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg>';
        // Add the icon to the beginning of the button and ensure text alignment
        todayButton.insertBefore(icon, todayButton.firstChild);
        todayButton.style.display = 'inline-flex';
        todayButton.style.alignItems = 'center';
      }
    }
  };

  // Function to handle event click and copy title to clipboard
  const handleEventClick = (clickInfo) => {
    const eventTitle = clickInfo.event.title;
    navigator.clipboard.writeText(eventTitle)
      .then(() => {
        // Show notification
        setNotification(`"${eventTitle}" copied to clipboard!`);
        
        // Clear any existing timeout
        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }
        
        // Set timeout to clear notification after 2 seconds
        notificationTimeoutRef.current = setTimeout(() => {
          setNotification('');
        }, 2000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        setNotification('Failed to copy text');
      });
  };
  
  return (
    <>
      <SEO 
        title="Calendar | 3D Print Wiki"
        description="Important dates and events for the 3D printing community."
        keywords="3D printing calendar, important dates, events, holidays, maker days"
        url="https://3dprintwiki.com/calendar"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            3D Printing Calendar
          </h1>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            <p className="mb-3 text-center">
              Keep track of important dates to plan your 3D printing projects ahead of time!
            </p>
          </div>
          
          {/* Custom styles for FullCalendar */}
          <style>{`
            /* Highlight today's date with a green background */
            .fc .fc-day-today {
              background-color: rgba(16, 185, 129, 0.15) !important; /* Green with transparency */
              border: 2px solid rgba(16, 185, 129, 0.5) !important;
            }
            
            /* For dark mode support */
            .dark .fc .fc-day-today {
              background-color: rgba(16, 185, 129, 0.2) !important;
              border: 2px solid rgba(16, 185, 129, 0.6) !important;
            }

            /* Add pointer cursor to events */
            .fc-event {
              cursor: pointer !important;
            }

            /* Fix navigation buttons */
            .fc-prev-button,
            .fc-next-button,
            .fc-today-button {
              padding: 0.5rem 0.75rem !important;
              margin-right: 6px !important;
            }

            .fc-prev-button .fc-icon,
            .fc-next-button .fc-icon {
              font-size: 1.2em !important;
              font-family: sans-serif !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              height: 100% !important;
              margin: 0 !important;
            }

            /* Re-implement navigation icons with simple characters that won't break */
            .fc-icon-chevron-left:before {
              content: '‹' !important;
              font-size: 1.5em !important;
              line-height: 0.8 !important;
            }

            .fc-icon-chevron-right:before {
              content: '›' !important;
              font-size: 1.5em !important;
              line-height: 0.8 !important;
            }

            /* Animation for notification */
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(-10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
            }

            .animate-fade-in-out {
              animation: fadeInOut 2s ease-in-out;
            }
          `}</style>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 relative">
            {/* Notification toast */}
            {notification && (
              <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
                {notification}
              </div>
            )}
            
            {/* Calendar Layout with Categories on the Left */}
            <div className="flex flex-col md:flex-row">
              {/* Categories Side Panel */}
              <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Event Categories</h3>
                <div className="flex flex-col space-y-2">
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#0ea5e9'}}>National Days</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(248, 113, 113, 0.2)', color: '#ef4444'}}>National Holidays</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(244, 63, 94, 0.2)', color: '#e11d48'}}>Country Celebrations</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(167, 139, 250, 0.2)', color: '#8b5cf6'}}>International Events</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#10b981'}}>Seasonal Events</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(251, 146, 60, 0.2)', color: '#f97316'}}>Cultural Days</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(232, 121, 249, 0.2)', color: '#d946ef'}}>Family Events</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(96, 165, 250, 0.2)', color: '#3b82f6'}}>Fun & Themed Days</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(45, 212, 191, 0.2)', color: '#14b8a6'}}>Industry Events</span>
                  <span className="inline-flex items-center px-2.5 py-2 rounded-md text-sm font-medium" style={{backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#22c55e'}}>Religious Holidays</span>
                </div>
              </div>
              
              {/* Calendar */}
              <div className="flex-grow">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                  }}
                  height="auto"
                  dayMaxEvents={3}
                  dayCellClassNames="calendar-day-cell"
                  datesSet={handleCalendarDidMount}
                  viewDidMount={handleCalendarDidMount}
                  eventClick={handleEventClick}
                  eventContent={(eventInfo) => (
                    <div 
                      className="fc-event-title cursor-pointer hover:underline" 
                      title="Click to copy"
                    >
                      {eventInfo.event.title}
                    </div>
                  )}
                  events={[
                    // January
                    { title: 'New Year Day', start: '2025-01-01', allDay: true, backgroundColor: '#38bdf8', borderColor: '#0ea5e9' },
                    { title: 'Science Fiction Day', start: '2025-01-02', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Sticker Day', start: '2025-01-13', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Hat Day', start: '2025-01-15', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'Get to Know Your Customers Day', start: '2025-01-16', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'Blue Monday', start: '2025-01-20', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'Martin Luther King Jr. Day', start: '2025-01-20', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Cheesy Socks Day', start: '2025-01-21', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Pie Day', start: '2025-01-23', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Compliment Day', start: '2025-01-24', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'National Spouse\'s Day', start: '2025-01-26', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'Australia Day', start: '2025-01-26', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },
                    { title: 'Chinese New Year', start: '2025-01-29', allDay: true, backgroundColor: '#818cf8', borderColor: '#6366f1' },

                    // February
                    { title: 'Groundhog Day', start: '2025-02-02', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'Grammy Awards', start: '2025-02-03', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'National Pizza Day', start: '2025-02-09', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'Super Bowl Sunday', start: '2025-02-09', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'Galentine\'s Day', start: '2025-02-13', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'Valentine\'s Day', start: '2025-02-14', allDay: true, backgroundColor: '#f87171', borderColor: '#ef4444' },
                    { title: 'Singles Awareness Day', start: '2025-02-15', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'Family Day', start: '2025-02-17', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'President\'s Day', start: '2025-02-17', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },
                    { title: 'National Retro Day', start: '2025-02-27', allDay: true, backgroundColor: '#f472b6', borderColor: '#ec4899' },

                    // March
                    { title: 'Oscars Night', start: '2025-03-03', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'National Grammar Day', start: '2025-03-04', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'National Dress Up Day', start: '2025-03-06', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'International Women\'s Day', start: '2025-03-08', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'National Pi Day', start: '2025-03-14', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'White Day', start: '2025-03-14', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'Holi Festival', start: '2025-03-14', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'St. Patrick\'s Day', start: '2025-03-17', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'Let\'s Laugh Day', start: '2025-03-19', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'Father\'s Day (PT, IT, ES)', start: '2025-03-19', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'First day of Spring', start: '2025-03-20', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'International Day of Happiness', start: '2025-03-20', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'International Cash Mob Day', start: '2025-03-24', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },
                    { title: 'Eid al-Fitr', start: '2025-03-30', allDay: true, backgroundColor: '#34d399', borderColor: '#10b981' },

                    // April
                    { title: 'April Fool\'s Day', start: '2025-04-01', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'National Sibling Day', start: '2025-04-10', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'National Pet Day', start: '2025-04-11', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Coachella Festival Start', start: '2025-04-11', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Coachella Festival End', start: '2025-04-20', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Good Friday', start: '2025-04-18', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Get to Know Your Customers Day', start: '2025-04-18', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Holy Saturday', start: '2025-04-19', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Easter Sunday', start: '2025-04-20', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Easter Monday', start: '2025-04-21', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Earth Day', start: '2025-04-22', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'World Book Day', start: '2025-04-23', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'International Dance Day', start: '2025-04-29', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },
                    { title: 'Honesty Day', start: '2025-04-30', allDay: true, backgroundColor: '#fcd34d', borderColor: '#f59e0b' },

                    // May
                    { title: 'Labor Day', start: '2025-05-01', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Brothers and Sisters Day', start: '2025-05-02', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Star Wars Day', start: '2025-05-04', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Cinco de Mayo', start: '2025-05-05', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'World War II Victory Day', start: '2025-05-08', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Europe Day', start: '2025-05-09', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Mother\'s Day', start: '2025-05-11', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'National Love a Tree Day', start: '2025-05-16', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Eurovision', start: '2025-05-17', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Victoria Day', start: '2025-05-19', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'National Wine Day', start: '2025-05-25', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'Memorial Day', start: '2025-05-27', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'National Creativity Day', start: '2025-05-30', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    { title: 'National Smile Day', start: '2025-05-31', allDay: true, backgroundColor: '#e879f9', borderColor: '#d946ef' },
                    
                    // June
                    { title: 'International Children\'s Day', start: '2025-06-01', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'World Environment Day', start: '2025-06-05', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'National Doughnut Day', start: '2025-06-06', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Best Friends Day', start: '2025-06-08', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'American Flag Day', start: '2025-06-14', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Father\'s Day', start: '2025-06-15', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Juneteenth', start: '2025-06-19', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Summer Solstice', start: '2025-06-21', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'International Yoga Day', start: '2025-06-21', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'National Selfie Day', start: '2025-06-21', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'International T-Shirt Day', start: '2025-06-21', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Glastonbury Start', start: '2025-06-25', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Glastonbury End', start: '2025-06-29', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'National Flip Flop Day', start: '2025-06-29', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    { title: 'Social Media Day', start: '2025-06-30', allDay: true, backgroundColor: '#60a5fa', borderColor: '#3b82f6' },
                    
                    // July
                    { title: 'Canada National Day', start: '2025-07-01', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'Independence Day (US)', start: '2025-07-04', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'National Bikini Day', start: '2025-07-05', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'World Chocolate Day', start: '2025-07-07', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'World Emoji Day', start: '2025-07-17', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'Get to Know Your Customers Day', start: '2025-07-18', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'National Moon Day', start: '2025-07-20', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'National Ice Cream Day', start: '2025-07-20', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    { title: 'International Day of Friendship', start: '2025-07-30', allDay: true, backgroundColor: '#f43f5e', borderColor: '#e11d48' },
                    
                    // August
                    { title: 'American Family Day', start: '2025-08-03', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Summer Bank Holiday (Ireland)', start: '2025-08-04', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'International Cat Day', start: '2025-08-08', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'National Book Lovers Day', start: '2025-08-09', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'National Lazy Day', start: '2025-08-10', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Son & Daughter Day', start: '2025-08-11', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'National Tell a Joke Day', start: '2025-08-16', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'National Nonprofit Day', start: '2025-08-17', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'World Photography Day', start: '2025-08-19', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Poet\'s Day', start: '2025-08-21', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Summer Bank Holiday (UK)', start: '2025-08-25', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'International Dog Day', start: '2025-08-26', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    
                    // September
                    { title: 'Labor Day (US)', start: '2025-09-01', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'Father\'s Day (AU, NZ)', start: '2025-09-07', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'International Literacy Day', start: '2025-09-08', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'National Grandparents Day', start: '2025-09-07', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'National Video Games Day', start: '2025-09-12', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'Oktoberfest Start', start: '2025-09-20', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'International Day of Peace', start: '2025-09-21', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'First day of Autumn', start: '2025-09-22', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'European Day of Languages', start: '2025-09-26', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'World Tourism Day', start: '2025-09-27', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'AFL Grand Final', start: '2025-09-27', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    
                    // October
                    { title: 'International Coffee Day', start: '2025-10-01', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'International Day of Older Persons', start: '2025-10-01', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'World Vegetarian Day', start: '2025-10-01', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'World Smile Day', start: '2025-10-03', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'World Animal Welfare Day', start: '2025-10-04', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'World Teacher\'s Day', start: '2025-10-05', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Oktoberfest End', start: '2025-10-05', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'World Mental Health Day', start: '2025-10-10', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Thanksgiving (Canada)', start: '2025-10-13', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Columbus Day', start: '2025-10-13', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Boss\'s Day', start: '2025-10-16', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Get to Know Your Customers Day', start: '2025-10-17', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Diwali Festival of Lights', start: '2025-10-20', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'National Make a Difference Day', start: '2025-10-25', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    { title: 'Halloween', start: '2025-10-31', allDay: true, backgroundColor: '#fb923c', borderColor: '#f97316' },
                    
                    // November
                    { title: 'World Vegan Day', start: '2025-11-01', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Melbourne Cup', start: '2025-11-04', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Bonfire Night (UK)', start: '2025-11-05', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Singles\' Day', start: '2025-11-11', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Veterans/Remembrance Day', start: '2025-11-11', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'International Men\'s Day', start: '2025-11-19', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'National Tie One On Day', start: '2025-11-26', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Thanksgiving (US)', start: '2025-11-27', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Black Friday', start: '2025-11-28', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    { title: 'Small Business Saturday', start: '2025-11-29', allDay: true, backgroundColor: '#a78bfa', borderColor: '#8b5cf6' },
                    
                    // December
                    { title: 'Cyber Monday', start: '2025-12-01', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Giving Tuesday', start: '2025-12-02', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'International 3D Printing Day', start: '2025-12-03', allDay: true, backgroundColor: '#2dd4bf', borderColor: '#14b8a6' },
                    { title: 'National Sock Day', start: '2025-12-04', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Culchie Shopping Day', start: '2025-12-08', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Green Monday', start: '2025-12-08', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'National Free Shipping Day', start: '2025-12-14', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Super Saturday', start: '2025-12-20', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Winter Solstice', start: '2025-12-21', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Christmas Eve', start: '2025-12-24', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Christmas Day', start: '2025-12-25', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Hanukkah', start: '2025-12-25', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Boxing Day', start: '2025-12-26', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Kwanzaa Start', start: '2025-12-26', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'Tick Tock Day', start: '2025-12-29', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' },
                    { title: 'New Year\'s Eve', start: '2025-12-31', allDay: true, backgroundColor: '#4ade80', borderColor: '#22c55e' }
                  ]}
                />
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </>
  )
}
