"use client";

import { LogoutButton } from "@/components/common/logout-button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {" "}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Portfolio Value
              </h3>
              <p className="text-3xl font-bold text-green-600">$125,430</p>
              <p className="text-sm text-gray-500 mt-1">
                +2.4% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Monthly Dividends
              </h3>
              <p className="text-3xl font-bold text-blue-600">$1,247</p>
              <p className="text-sm text-gray-500 mt-1">Expected this month</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Yield Rate
              </h3>
              <p className="text-3xl font-bold text-purple-600">4.2%</p>
              <p className="text-sm text-gray-500 mt-1">
                Average portfolio yield
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">AAPL dividend received</span>
                <span className="text-green-600 font-medium">+$24.50</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">MSFT dividend received</span>
                <span className="text-green-600 font-medium">+$18.75</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">KO dividend received</span>
                <span className="text-green-600 font-medium">+$12.30</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Portfolio Value
              </h3>
              <p className="text-3xl font-bold text-green-600">$125,430</p>
              <p className="text-sm text-gray-500 mt-1">
                +2.4% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Monthly Dividends
              </h3>
              <p className="text-3xl font-bold text-blue-600">$1,247</p>
              <p className="text-sm text-gray-500 mt-1">Expected this month</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Yield Rate
              </h3>
              <p className="text-3xl font-bold text-purple-600">4.2%</p>
              <p className="text-sm text-gray-500 mt-1">
                Average portfolio yield
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">AAPL dividend received</span>
                <span className="text-green-600 font-medium">+$24.50</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">MSFT dividend received</span>
                <span className="text-green-600 font-medium">+$18.75</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">KO dividend received</span>
                <span className="text-green-600 font-medium">+$12.30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
