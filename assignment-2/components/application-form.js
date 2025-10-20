// KHÔNG tạo app ở đây, chỉ khai báo component
const ApplicationForm = {
  data() {
    return {
      form: {
        firstName: '', lastName: '', username: '',
        password: '', confirm: '', email: '',
        street: '', suburb: '', postcode: '',
        mobile: '', dob: '', category: '', agree: false
      },
      errors: {},
      showTerms: false
    };
  },
  methods: {
    validate() {
      this.errors = {};
      const lettersOnly = /^[A-Za-z]+$/;
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const postcodeRx = /^\d{4}$/;
      const mobileRx = /^04\d{8}$/;
      const hasSpecial = /[\$\%\^&\*]/;

      if (!this.form.firstName || !lettersOnly.test(this.form.firstName))
        this.errors.firstName = 'Letters only (A–Z).';
      if (!this.form.lastName || !lettersOnly.test(this.form.lastName))
        this.errors.lastName = 'Letters only (A–Z).';
      if (!this.form.username || this.form.username.length < 3)
        this.errors.username = 'Min 3 characters.';
      if (!this.form.password || this.form.password.length < 8 || !hasSpecial.test(this.form.password))
        this.errors.password = 'Min 8 chars and include one of $, %, ^, &, *.';
      if (this.form.confirm !== this.form.password)
        this.errors.confirm = 'Passwords must match.';
      if (!emailRx.test(this.form.email))
        this.errors.email = 'Invalid email format.';
      if (this.form.street && this.form.street.length > 40)
        this.errors.street = 'Max 40 characters.';
      if (this.form.suburb && this.form.suburb.length > 20)
        this.errors.suburb = 'Max 20 characters.';
      if (!postcodeRx.test(this.form.postcode))
        this.errors.postcode = 'Postcode must be exactly 4 digits.';
      if (!mobileRx.test(this.form.mobile))
        this.errors.mobile = 'Mobile must start with 04 and be 10 digits total.';

      const dobDate = this.form.dob ? new Date(this.form.dob) : null;
      if (!dobDate || Number.isNaN(dobDate.getTime())) {
        this.errors.dob = 'Please select a valid date.';
      } else {
        const now = new Date();
        const ageYears = (now - dobDate) / 31557600000;
        if (ageYears < 16) this.errors.dob = 'Applicant must be at least 16 years old.';
      }

      if (!this.form.category) this.errors.category = 'Please select a category.';
      return Object.keys(this.errors).length === 0;
    },
    onSubmit(e) {
      if (!this.validate()) {
        e.preventDefault();
        const firstKey = Object.keys(this.errors)[0];
        if (firstKey) {
          const el = this.$el.querySelector(`#${firstKey}`);
          if (el) el.focus();
        }
      }
    }
  },
  template: `
      <form method="post" action="http://mercury.swin.edu.au/it000000/formtest.php" @submit="onSubmit">
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" name="firstName" v-model="form.firstName" />
    <small v-if="errors.firstName" style="color:red">{{ errors.firstName }}</small>
    <br><br>

    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" name="lastName" v-model="form.lastName" />
    <small v-if="errors.lastName" style="color:red">{{ errors.lastName }}</small>
    <br><br>

    <label for="username">Username:</label>
    <input type="text" id="username" name="username" v-model="form.username" />
    <small v-if="errors.username" style="color:red">{{ errors.username }}</small>
    <br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" v-model="form.password" />
    <small v-if="errors.password" style="color:red">{{ errors.password }}</small>
    <br><br>

    <label for="confirm">Confirm Password:</label>
    <input type="password" id="confirm" name="confirm" v-model="form.confirm" />
    <small v-if="errors.confirm" style="color:red">{{ errors.confirm }}</small>
    <br><br>

    <label for="email">Email:</label>
    <input type="text" id="email" name="email" v-model="form.email" />
    <small v-if="errors.email" style="color:red">{{ errors.email }}</small>
    <br><br>

    <label for="street">Street Address:</label>
    <input type="text" id="street" name="street" v-model="form.street" />
    <small v-if="errors.street" style="color:red">{{ errors.street }}</small>
    <br><br>

    <label for="suburb">Suburb:</label>
    <input type="text" id="suburb" name="suburb" v-model="form.suburb" />
    <small v-if="errors.suburb" style="color:red">{{ errors.suburb }}</small>
    <br><br>

    <label for="postcode">Postcode:</label>
    <input type="text" id="postcode" name="postcode" v-model="form.postcode" />
    <small v-if="errors.postcode" style="color:red">{{ errors.postcode }}</small>
    <br><br>

    <label for="mobile">Mobile:</label>
    <input type="text" id="mobile" name="mobile" placeholder="04xxxxxxxx" v-model="form.mobile" />
    <small v-if="errors.mobile" style="color:red">{{ errors.mobile }}</small>
    <br><br>

    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob" v-model="form.dob" />
    <small v-if="errors.dob" style="color:red">{{ errors.dob }}</small>
    <br><br>

    <label for="category">Job Category:</label>
    <select id="category" name="category" v-model="form.category">
      <option disabled value="">-- Select category --</option>
      <option>Developer</option>
      <option>Designer</option>
      <option>Data Analyst</option>
      <option>Marketing</option>
    </select>
    <small v-if="errors.category" style="color:red">{{ errors.category }}</small>
    <br><br>

    <button type="button" @click="showTerms = !showTerms">Terms & Conditions</button>
    <div v-if="showTerms" style="margin:8px 0; padding:8px; border:1px solid #ccc;">
      <h3>Terms and Conditions</h3>
      <p>Please read these terms and conditions carefully before submitting your application.
        By submitting the application form, you agree to comply with and be bound by the following terms and conditions...</p>

      <input type="checkbox" id="agree" name="agree" v-model="form.agree" value="yes" />
      <label for="agree">I agree to the terms and conditions.</label>
    </div>

    <button type="submit">Submit</button>
  </form>

  `
};
