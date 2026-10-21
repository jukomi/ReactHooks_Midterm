import { useState, useRef, useEffect } from 'react';

export default function AccessibleForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [previousSubmittedEmail, setPreviousSubmittedEmail] = useState('');

  // 1. Create refs for all three input elements
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const lastSubmittedEmailRef = useRef('');

  // Auto-focus first input on initial mount
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Focus first invalid field in order: name -> email -> password
      if (validationErrors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (validationErrors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (validationErrors.password && passwordRef.current) {
        passwordRef.current.focus();
      }
    } else {
      setErrors({});
      setPreviousSubmittedEmail(lastSubmittedEmailRef.current);
      lastSubmittedEmailRef.current = formData.email;
      setSubmittedEmail(formData.email);

      setFormData({ name: '', email: '', password: '' });
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  };

  return (
    <section className="exam-card">
      <h2 className="exam-title">Accessible Form Toolkit</h2>

      {submittedEmail && (
        <div className="notice">
          <div><strong>Submitted email:</strong> {submittedEmail}</div>
          {previousSubmittedEmail && (
            <div className="notice-secondary">
              <strong>Previous email:</strong> {previousSubmittedEmail}
            </div>
          )}
        </div>
      )}

      <form className="form-stack" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="name">Full name</label>
          <input
            className={`field${errors.name ? ' field-invalid' : ''}`}
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="email">Email address</label>
          <input
            className={`field${errors.email ? ' field-invalid' : ''}`}
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            className={`field${errors.password ? ' field-invalid' : ''}`}
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span className="field-error" id="password-error">
              {errors.password}
            </span>
          )}
        </div>

        <button className="button button-primary" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}