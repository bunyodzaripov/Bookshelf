"use client";

import { useState } from "react";
import { User, Bell, Lock, Trash2 } from "lucide-react";
import { mockUsers } from "@/lib/mockData";
import { CITIES } from "@/lib/mockData";

const currentUser = mockUsers[0];

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const [accountForm, setAccountForm] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: "jasur@example.com",
    city: currentUser.city,
    bio: "Book lover from Tashkent. I enjoy history, psychology and classic Uzbek literature.",
  });

  const [notifications, setNotifications] = useState({
    exchangeRequests: true,
    exchangeAccepted: true,
    newMessages: true,
    communityReplies: false,
    weeklyDigest: true,
    marketing: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: real save
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar tabs */}
      <aside className="w-48 shrink-0">
        <div className="flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors text-left ${
                activeTab === id
                  ? "bg-accent text-white font-medium"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 max-w-lg">
        {/* Account settings */}
        {activeTab === "account" && (
          <div className="flex flex-col gap-5">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-5">
                Personal information
              </h3>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={accountForm.name}
                      onChange={(e) =>
                        setAccountForm({ ...accountForm, name: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={accountForm.username}
                        onChange={(e) =>
                          setAccountForm({
                            ...accountForm,
                            username: e.target.value,
                          })
                        }
                        className="w-full bg-background border border-border rounded-xl pl-7 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={accountForm.email}
                    onChange={(e) =>
                      setAccountForm({ ...accountForm, email: e.target.value })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    City
                  </label>
                  <select
                    value={accountForm.city}
                    onChange={(e) =>
                      setAccountForm({ ...accountForm, city: e.target.value })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Bio
                  </label>
                  <textarea
                    value={accountForm.bio}
                    onChange={(e) =>
                      setAccountForm({ ...accountForm, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {accountForm.bio.length}/200 characters
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`self-start px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                saved
                  ? "bg-green-500 text-white"
                  : "bg-accent text-white hover:bg-accent/90"
              }`}
            >
              {saved ? "✓ Saved!" : "Save changes"}
            </button>

            {/* Danger zone */}
            <div className="bg-card border border-red-200 rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-1">Danger zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, all your data will be permanently
                removed.
              </p>
              <button className="flex items-center gap-2 text-red-500 border border-red-200 px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition-colors">
                <Trash2 size={15} />
                Delete account
              </button>
            </div>
          </div>
        )}

        {/* Notification settings */}
        {activeTab === "notifications" && (
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-medium text-foreground mb-5">
              Notification preferences
            </h3>
            <div className="flex flex-col gap-1">
              {[
                {
                  key: "exchangeRequests",
                  label: "Exchange requests",
                  desc: "When someone sends you a swap request",
                },
                {
                  key: "exchangeAccepted",
                  label: "Exchange accepted",
                  desc: "When your request is accepted or declined",
                },
                {
                  key: "newMessages",
                  label: "New messages",
                  desc: "When you receive a new message",
                },
                {
                  key: "communityReplies",
                  label: "Community replies",
                  desc: "When someone replies to your post",
                },
                {
                  key: "weeklyDigest",
                  label: "Weekly digest",
                  desc: "A summary of new books and activity",
                },
                {
                  key: "marketing",
                  label: "News & updates",
                  desc: "Platform news and feature announcements",
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3.5 border-b border-border last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof prev],
                      }))
                    }
                    className={`w-11 h-6 rounded-full transition-colors shrink-0 relative ${
                      notifications[key as keyof typeof notifications]
                        ? "bg-accent"
                        : "bg-border"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                        notifications[key as keyof typeof notifications]
                          ? "left-5.5"
                          : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security settings */}
        {activeTab === "security" && (
          <div className="flex flex-col gap-5">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-5">
                Change password
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Current password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.current}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        current: e.target.value,
                      })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    New password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    value={passwordForm.new}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, new: e.target.value })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirm}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirm: e.target.value,
                      })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>
                <button className="self-start bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors">
                  Update password
                </button>
              </div>
            </div>

            {/* Active sessions */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-4">
                Active sessions
              </h3>
              {[
                {
                  device: "Chrome · Windows",
                  location: "Tashkent, UZ",
                  time: "Now",
                  current: true,
                },
                {
                  device: "Safari · iPhone",
                  location: "Tashkent, UZ",
                  time: "2 hours ago",
                  current: false,
                },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border last:border-none"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {session.device}
                      </p>
                      {session.current && (
                        <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {session.location} · {session.time}
                    </p>
                  </div>
                  {!session.current && (
                    <button className="text-xs text-red-500 hover:underline">
                      Sign out
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
