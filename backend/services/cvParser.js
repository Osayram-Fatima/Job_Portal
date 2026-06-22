const fs = require('fs');
const pdf = require('pdf-parse'); // ✅ Wapas pdf rakho
const mammoth = require('mammoth');

class CVParser {
  
  // Main parsing function
  async parseCV(filePath, fileType) {
    try {
      let text = '';
      
      // Extract text based on file type
      if (fileType === 'application/pdf') {
        text = await this.parsePDF(filePath);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await this.parseDOCX(filePath);
      } else {
        throw new Error('Unsupported file type');
      }

      // Extract structured data
      const extractedData = this.extractData(text);
      
      return extractedData;
      
    } catch (error) {
      throw new Error(`CV parsing failed: ${error.message}`);
    }
  }

 // Parse PDF
async parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer); // ✅ Directly call karo
  return data.text;
}

  // Parse DOCX
  async parseDOCX(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  // Extract structured data from text
  extractData(text) {
    return {
      full_name: this.extractName(text),
      email: this.extractEmail(text),
      phone_number: this.extractPhone(text),
      preferred_city: this.extractLocation(text),
      skills: this.extractSkills(text),
      qualification: this.extractEducation(text),
      experience_level: this.extractExperience(text),
      current_role: this.extractCurrentRole(text)
    };
  }

  // Extract email (regex)
  extractEmail(text) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  }

  // Extract phone number
  extractPhone(text) {
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const match = text.match(phoneRegex);
    return match ? match[0].replace(/\s+/g, '') : null;
  }

  // Extract name (first 2-3 lines usually)
  extractName(text) {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    // Name is typically in first few lines, before email
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim();
      // Skip lines with email, phone, or common headers
      if (line.match(/@/) || line.match(/\d{3}/) || 
          line.toLowerCase().includes('curriculum') ||
          line.toLowerCase().includes('resume')) {
        continue;
      }
      // Name is usually 2-4 words, capitalized
      if (line.split(' ').length >= 2 && line.split(' ').length <= 4) {
        return line;
      }
    }
    return null;
  }

  // Extract location/city
  extractLocation(text) {
    const locationKeywords = ['location:', 'address:', 'city:', 'based in'];
    const lines = text.toLowerCase().split('\n');
    
    for (let line of lines) {
      for (let keyword of locationKeywords) {
        if (line.includes(keyword)) {
          return line.split(keyword)[1].trim().split(',')[0];
        }
      }
    }
    return null;
  }

  // Extract skills
  extractSkills(text) {
    const skillsSection = this.extractSection(text, ['skills', 'technical skills', 'competencies']);
    
    if (skillsSection) {
      // Common tech skills to look for
      const commonSkills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'MongoDB',
        'Express', 'HTML', 'CSS', 'TypeScript', 'Angular', 'Vue', 'Docker',
        'AWS', 'Git', 'REST API', 'GraphQL', 'Redux', 'Next.js'
      ];
      
      const foundSkills = commonSkills.filter(skill => 
        skillsSection.toLowerCase().includes(skill.toLowerCase())
      );
      
      return foundSkills.length > 0 ? foundSkills.join(', ') : skillsSection.substring(0, 200);
    }
    
    return null;
  }

  // Extract education
  extractEducation(text) {
    const educationSection = this.extractSection(text, ['education', 'academic', 'qualification']);
    
    if (educationSection) {
      const degrees = ['Bachelor', 'Master', 'PhD', 'B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc'];
      
      for (let degree of degrees) {
        if (educationSection.includes(degree)) {
          // Extract the line containing the degree
          const lines = educationSection.split('\n');
          for (let line of lines) {
            if (line.includes(degree)) {
              return line.trim().substring(0, 150);
            }
          }
        }
      }
      
      return educationSection.split('\n')[0].trim().substring(0, 150);
    }
    
    return null;
  }

  // Extract experience level
  extractExperience(text) {
    const experienceSection = this.extractSection(text, ['experience', 'work history', 'employment']);
    
    if (experienceSection) {
      // Count years mentioned
      const yearMatches = experienceSection.match(/\d{4}/g);
      
      if (yearMatches && yearMatches.length >= 2) {
        const years = yearMatches.map(y => parseInt(y));
        const experience = Math.max(...years) - Math.min(...years);
        
        if (experience < 2) return 'Entry Level';
        if (experience < 5) return 'Mid Level';
        return 'Senior Level';
      }
    }
    
    // Default fallback
    return 'Mid Level';
  }

  // Extract current role
  extractCurrentRole(text) {
    const experienceSection = this.extractSection(text, ['experience', 'work history']);
    
    if (experienceSection) {
      const lines = experienceSection.split('\n').filter(l => l.trim().length > 0);
      // First role mentioned is usually current
      if (lines.length > 0) {
        return lines[0].trim().substring(0, 100);
      }
    }
    
    return null;
  }

  // Helper: Extract section by keywords
  extractSection(text, keywords) {
    const lowerText = text.toLowerCase();
    
    for (let keyword of keywords) {
      const index = lowerText.indexOf(keyword);
      if (index !== -1) {
        // Get text after keyword until next section
        const afterKeyword = text.substring(index);
        const nextSectionIndex = afterKeyword.search(/\n[A-Z][A-Z\s]{3,}\n/);
        
        if (nextSectionIndex !== -1) {
          return afterKeyword.substring(0, nextSectionIndex);
        }
        
        // If no clear next section, take next 500 chars
        return afterKeyword.substring(0, 500);
      }
    }
    
    return null;
  }
}

module.exports = new CVParser();