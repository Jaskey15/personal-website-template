'use client';

import { PageContainer } from "@/components/page-container";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for reaching out! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageContainer maxWidth="2xl" centerContent>
        {/* Header */}
        <div className="mb-8 animate-fade-in article-content">
          <p className="text-muted-foreground tracking-wide">
            Whether it's a project idea, collaboration, or just an interesting conversation, I'm always excited to gain a new perspective
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: '200ms' }}
        >
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-lg font-semibold rounded-full bg-accent/20 border-2 border-accent text-foreground hover:bg-accent/30 hover:border-accent/80 transition-all duration-300 hover:scale-[1.02] shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Success/Error Messages */}
          {submitStatus.type && (
            <div
              className={`mt-6 p-4 rounded-lg border-2 animate-fade-in ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400'
                  : 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400'
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
    </PageContainer>
  );
}
