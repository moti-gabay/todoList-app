# ... (חלק ה-builder נשאר אותו דבר)

FROM nginx:alpine
COPY package*.json ./
RUN npm install

# מחיקת הגדרות ברירת המחדל של Nginx כדי למנוע התנגשויות
RUN rm /etc/nginx/conf.d/default.conf

# העתקת הקונפיגורציה שלך
COPY nginx.conf /etc/nginx/conf.d/default.conf

# העתקת קבצי ה-Build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]