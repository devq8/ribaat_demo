# Ribaat — Subject lines & preheaders

The subject is the template's `{% block title %}`; the preheader is its `{% block preheader %}`
(rendered hidden at the top of `base.html`, before the header band). Both are Arabic-only.
Values interpolated at send time are shown as `{{ var }}` — the same variables documented in
`README.md`.

Preheaders are 60–110 Arabic characters: long enough to fill the inbox snippet, short enough
that no client truncates mid-word. Nothing in either line is required for the email to be
understood — the card restates every fact.

## A — الحساب والدخول (auth)

### 1. `auth/email_verification.html`
*1. تفعيل البريد الإلكتروني — email verification*

| | |
| --- | --- |
| **الموضوع** | تفعيل البريد الإلكتروني |
| **النص التمهيدي** | أكمِل تفعيل حسابك في منصة رباط الحنابلة بتأكيد بريدك الإلكتروني. |

### 2. `auth/password_reset.html`
*2. إعادة تعيين كلمة المرور — password reset*

| | |
| --- | --- |
| **الموضوع** | إعادة تعيين كلمة المرور |
| **النص التمهيدي** | رابط إعادة تعيين كلمة المرور الخاصة بحسابك، صالح لمدة محدودة. |

### 3. `auth/otp_code.html`
*3. رمز التحقق — one-time code / two-factor*

| | |
| --- | --- |
| **الموضوع** | رمز التحقق |
| **النص التمهيدي** | رمز التحقق لمرة واحدة لإكمال تسجيل الدخول إلى حسابك. |

### 4. `auth/welcome.html`
*4. رسالة ترحيب — welcome (after activation)*

| | |
| --- | --- |
| **الموضوع** | مرحبًا بك في منصة رباط الحنابلة |
| **النص التمهيدي** | فُعِّل حسابك، وهذه نظرة على ما يمكنك البدء به في المنصة. |

### 5. `auth/password_changed.html`
*5. تأكيد تغيير كلمة المرور — password changed (security notice)*

| | |
| --- | --- |
| **الموضوع** | تم تغيير كلمة المرور |
| **النص التمهيدي** | إشعار أمني: تم تغيير كلمة المرور لحسابك في المنصة. |

### 6. `auth/new_signin_alert.html`
*6. تنبيه تسجيل دخول جديد — new device / location sign-in*

| | |
| --- | --- |
| **الموضوع** | تسجيل دخول جديد إلى حسابك |
| **النص التمهيدي** | سُجِّل دخول إلى حسابك من جهاز أو موقع لم نتعرّف عليه سابقًا. |

## B — الأكاديمي (academic)

### 7. `academic/course_enrollment.html`
*7. تأكيد التسجيل في مقرر — course enrollment confirmation*

| | |
| --- | --- |
| **الموضوع** | تأكيد التسجيل في مقرر |
| **النص التمهيدي** | تم تسجيلك في المقرر، وصار بإمكانك الوصول إلى دروسه. |

### 8. `academic/path_enrollment.html`
*8. تأكيد الالتحاق بمسار — learning path enrollment*

| | |
| --- | --- |
| **الموضوع** | تأكيد الالتحاق بمسار دراسي |
| **النص التمهيدي** | تم التحاقك بالمسار الدراسي، وهذه تفاصيل مقرراته. |

### 9. `academic/new_lecture.html`
*9. نشر محاضرة جديدة — new lecture published*

| | |
| --- | --- |
| **الموضوع** | نشر محاضرة جديدة |
| **النص التمهيدي** | نُشرت محاضرة جديدة في أحد مقرراتك المسجّلة. |

### 10. `academic/course_unlocked.html`
*10. إتاحة مقرر بعد استيفاء المتطلبات — prerequisite satisfied*

| | |
| --- | --- |
| **الموضوع** | إتاحة مقرر جديد |
| **النص التمهيدي** | استوفيت متطلب المقرر السابق، وصار المقرر التالي متاحًا لك. |

### 11. `academic/certificate_issued_course.html`
*11. إصدار شهادة إتمام مقرر — course certificate issued*

| | |
| --- | --- |
| **الموضوع** | إصدار شهادة إتمام مقرر |
| **النص التمهيدي** | صدرت شهادة إتمامك للمقرر، ويمكن التحقق منها عبر المنصة. |

### 12. `academic/certificate_issued_path.html`
*12. إصدار شهادة إتمام مسار — path certificate issued (higher weight)*

| | |
| --- | --- |
| **الموضوع** | إصدار شهادة إتمام مسار |
| **النص التمهيدي** | صدرت شهادة إتمام المسار الدراسي باسمك، مع معرّف تحقق. |

### 13. `academic/admin_announcement.html`
*13. إعلان من إدارة المنصة — administrative announcement*

| | |
| --- | --- |
| **الموضوع** | إعلان من إدارة المنصة |
| **النص التمهيدي** | إعلان إداري يتعلق بمقرراتك المسجّلة في المنصة. |

## C — المدفوعات (billing)

### 14. `billing/payment_receipt.html`
*14. إيصال دفع — payment receipt*

| | |
| --- | --- |
| **الموضوع** | إيصال دفع |
| **النص التمهيدي** | إيصال بالمبلغ المدفوع عن تسجيلك في المنصة. |

### 15. `billing/invoice.html`
*15. فاتورة — invoice*

| | |
| --- | --- |
| **الموضوع** | فاتورة |
| **النص التمهيدي** | فاتورة مستحقة عن التسجيل في المنصة، مع تفصيل البنود. |

### 16. `billing/payment_failed.html`
*16. تعذّر إتمام عملية الدفع — payment failure*

| | |
| --- | --- |
| **الموضوع** | تعذّر إتمام عملية الدفع |
| **النص التمهيدي** | لم تُكتمل عملية الدفع، ولم يُخصم من حسابك أي مبلغ. |

### 17. `billing/refund.html`
*17. إشعار استرداد — refund notice*

| | |
| --- | --- |
| **الموضوع** | إشعار استرداد مبلغ |
| **النص التمهيدي** | اعتُمد استرداد مبلغ إلى وسيلة الدفع الأصلية. |

## Open items

- **Sender identity** — display name, from-address and reply-to are not set here; see
  README open question 3. A subject prefix (e.g. «رباط الحنابلة — …») was deliberately
  **not** added: the sender display name should carry the brand, not every subject line.
- **Arabic copy** — functional draft, pending review by a native scholarly reviewer
  (README open question 9). Subjects and preheaders are part of that review.
