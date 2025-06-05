var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};
function filledCell(cell) {
  return cell !== "" && cell != null;
}
function loadFileData(filename) {
  if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
      var workbook = XLSX.read(gk_fileData[filename], { type: "base64" });
      var firstSheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheetName];

      // Convert sheet to JSON to filter blank rows
      var jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });
      // Filter out blank rows (rows where all cells are empty, null, or undefined)
      var filteredData = jsonData.filter((row) => row.some(filledCell));

      // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
      var headerRowIndex = filteredData.findIndex(
        (row, index) =>
          row.filter(filledCell).length >=
          filteredData[index + 1]?.filter(filledCell).length
      );
      // Fallback
      if (headerRowIndex === -1 || headerRowIndex > 25) {
        headerRowIndex = 0;
      }

      // Convert filtered JSON back to CSV
      var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
      csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
      return csv;
    } catch (e) {
      console.error(e);
      return "";
    }
  }
  return gk_fileData[filename] || "";
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Show success message
      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.classList.remove('hidden');
      }
      this.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.add('hidden');
        }
      }, 5000);
    });
  }
});

// Add active class to navigation links on scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // EmailJS initialization
  (function () {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
  })();

  // Contact form submission with EmailJS
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
      name: this.name.value,
      email: this.email.value,
      company: this.company.value,
      message: this.message.value
    };

    // Send email using EmailJS
    emailjs.send('default_service', 'template_id', templateParams)
      .then(function () {
        // Show success message
        document.getElementById('success-message').classList.remove('hidden');
        document.getElementById('contact-form').reset();

        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(function () {
          document.getElementById('success-message').classList.add('hidden');
        }, 5000);
      }, function (error) {
        // Show error message
        console.error('Email sending failed:', error);
        document.getElementById('error-message').classList.remove('hidden');

        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Hide error message after 5 seconds
        setTimeout(function () {
          document.getElementById('error-message').classList.add('hidden');
        }, 5000);
      });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('bg-opacity-95');
    } else {
      nav.classList.remove('bg-opacity-95');
    }
  });

  // Add intersection observer for animations
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

  // Observe elements for animation
  document.querySelectorAll('.hover-lift').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-in-out';
    observer.observe(el);
  });
});