import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Button';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  postalCode: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
});

export default function CheckoutForm({ onSubmit, loading }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      paymentMethod: 'credit',
      notes: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-red-500 text-sm">{formik.errors.address}</div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postalCode}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              value="credit"
              checked={formik.values.paymentMethod === 'credit'}
              onChange={formik.handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
            />
            <label htmlFor="credit" className="ml-2 block text-sm text-gray-900">
              Credit Card
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              value="paypal"
              checked={formik.values.paymentMethod === 'paypal'}
              onChange={formik.handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
            />
            <label htmlFor="paypal" className="ml-2 block text-sm text-gray-900">
              PayPal
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="cash"
              name="paymentMethod"
              type="radio"
              value="cash"
              checked={formik.values.paymentMethod === 'cash'}
              onChange={formik.handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
            />
            <label htmlFor="cash" className="ml-2 block text-sm text-gray-900">
              Cash on Delivery
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Delivery Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.notes}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={loading || !formik.isValid}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
}