# Cinar Grill - Restaurant Webseite

Eine moderne, responsive Webseite für das Restaurant Cinar Grill, die authentische Grillspezialitäten und mediterrane Küche präsentiert.

## 🎯 Features

- **Responsive Design**: Vollständig optimiert für Desktop, Tablet und Mobile
- **Moderne Benutzeroberfläche**: Ansprechendes Design mit sanften Animationen
- **Smooth Scrolling**: Sanfte Navigation zwischen Sektionen
- **Mobile Menu**: Hamburger-Menü für mobile Geräte
- **Kontaktformular**: Einfache Kontaktaufnahme für Gäste
- **Speisekarte**: Übersichtliche Darstellung der Gerichte mit Preisen
- **Galerie**: Bereich für Bilder von Gerichten und Restaurant

## 📁 Projektstruktur

```
cinar-grill-sitee/
├── index.html          # Haupt-HTML-Datei
├── css/
│   └── style.css       # Stylesheet mit allen Designs
├── js/
│   └── script.js       # JavaScript für Interaktivität
├── images/             # Ordner für Bilder
├── assets/             # Ordner für zusätzliche Assets
└── README.md           # Diese Datei
```

## 🚀 Schnellstart

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd cinar-grill-sitee
   ```

2. **Webseite öffnen**
   - Öffnen Sie einfach die `index.html` Datei in Ihrem Browser
   - Oder verwenden Sie einen lokalen Webserver:
     ```bash
     # Mit Python 3
     python -m http.server 8000

     # Mit Node.js (http-server)
     npx http-server
     ```

3. **Im Browser öffnen**
   - Navigieren Sie zu `http://localhost:8000`

## 🎨 Anpassung

### Farben ändern

Die Farben können in der `css/style.css` Datei angepasst werden. Suchen Sie nach den CSS-Variablen:

```css
:root {
    --primary-color: #d4472c;     /* Hauptfarbe */
    --secondary-color: #2c3e50;   /* Sekundärfarbe */
    --accent-color: #f39c12;      /* Akzentfarbe */
    --text-dark: #333;            /* Dunkler Text */
    --text-light: #666;           /* Heller Text */
    --bg-light: #f8f9fa;          /* Heller Hintergrund */
    --white: #ffffff;             /* Weiß */
}
```

### Inhalte ändern

- **Restaurant-Informationen**: Bearbeiten Sie die entsprechenden Bereiche in `index.html`
- **Speisekarte**: Aktualisieren Sie die Menüeinträge im Menu-Bereich
- **Kontaktdaten**: Ändern Sie Adresse, Telefon und Öffnungszeiten im Kontakt-Bereich

### Bilder hinzufügen

1. Fügen Sie Ihre Bilder in den `images/` Ordner ein
2. Ersetzen Sie die Placeholder-Divs mit `<img>` Tags:
   ```html
   <img src="images/ihr-bild.jpg" alt="Beschreibung">
   ```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 481px
- **Mobile**: < 480px

## 🛠️ Technologien

- **HTML5**: Semantisches Markup
- **CSS3**: Moderne Styling-Techniken, Flexbox, Grid
- **JavaScript (Vanilla)**: Keine Frameworks erforderlich
- **Google Fonts**: Playfair Display & Poppins

## 📄 Browser-Kompatibilität

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## 🔄 Zukünftige Erweiterungen

- [ ] Online-Reservierungssystem
- [ ] Integration von Google Maps
- [ ] Online-Bestellsystem
- [ ] Mehrsprachige Unterstützung (DE/EN/TR)
- [ ] Backend für Kontaktformular
- [ ] Bildergalerie mit Lightbox
- [ ] Social Media Integration

## 📞 Support

Bei Fragen oder Problemen können Sie uns kontaktieren:
- Email: info@cinar-grill.de
- Telefon: +49 (0) 123 456789

## 📝 Lizenz

© 2024 Cinar Grill. Alle Rechte vorbehalten.

---

**Hinweis**: Dies ist eine Template-Webseite. Bitte passen Sie alle Inhalte, Bilder und Kontaktdaten an Ihre spezifischen Anforderungen an.
