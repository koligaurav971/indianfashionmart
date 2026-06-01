import { ExternalBlob } from "@/backend";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  Edit2,
  MapPin,
  Phone,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProfilePage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => actor?.getCallerUserProfile() ?? null,
    enabled: isReady && isAuthenticated,
  });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const startEdit = () => {
    setName(profile?.name ?? "");
    setBio(profile?.bio ?? "");
    setLocation(profile?.location ?? "");
    setPhone(profile?.phone ?? "");
    setAvatarPreview(profile?.avatarUrl ?? null);
    setAvatarFile(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Profile completion calculation
  const completionFields = [
    profile?.name,
    profile?.bio,
    profile?.location,
    profile?.phone,
    profile?.avatarUrl,
  ];
  const filledCount = completionFields.filter(Boolean).length;
  const completionPct = Math.round(
    (filledCount / completionFields.length) * 100,
  );

  const memberDate = profile
    ? new Date(
        Number(profile.memberSince / BigInt(1_000_000)),
      ).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "";

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      let avatarUrl = profile?.avatarUrl;
      if (avatarFile) {
        const bytes = new Uint8Array(await avatarFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        avatarUrl = blob.getDirectURL();
      }
      return actor.saveCallerUserProfile({
        name: name.trim(),
        bio: bio.trim() || undefined,
        location: location.trim() || undefined,
        phone: phone.trim() || undefined,
        avatarUrl,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      setEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      toast.success("Profile saved!");
    },
    onError: () => toast.error("Failed to save profile."),
  });

  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto max-w-screen-sm px-4 py-16 text-center"
        data-ocid="profile.auth_required"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          My Profile
        </h2>
        <p className="text-muted-foreground mb-6">
          Login to view and manage your profile.
        </p>
        <Button onClick={login} data-ocid="profile.login_button">
          Login with Internet Identity
        </Button>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="mx-auto max-w-screen-md px-4 py-8">
        <LoadingSkeleton
          variant="avatar"
          count={3}
          className="flex flex-col gap-4"
        />
      </div>
    );

  const displayAvatar = profile?.avatarUrl;
  const initials = (profile?.name ?? "U").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-screen-md px-4 py-8" data-ocid="profile.page">
      {/* Profile Card */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        {/* Top accent strip */}
        <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />

        <div className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="h-24 w-24 ring-4 ring-background shadow-md">
                {displayAvatar ? (
                  <AvatarImage src={displayAvatar} alt={profile?.name} />
                ) : null}
                <AvatarFallback className="text-2xl font-bold bg-primary/15 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!editing && (
                <button
                  type="button"
                  onClick={startEdit}
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                  aria-label="Edit profile"
                  data-ocid="profile.quick_edit_button"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {!editing ? (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h1 className="font-display text-2xl font-bold text-foreground">
                        {profile?.name ?? "Complete your profile"}
                      </h1>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {profile?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            {profile.location}
                          </span>
                        )}
                        {profile?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-accent" />
                            {profile.phone}
                          </span>
                        )}
                        {memberDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Member since {memberDate}
                          </span>
                        )}
                      </div>
                      {profile?.bio && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-prose">
                          {profile.bio}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startEdit}
                      data-ocid="profile.edit_button"
                      className="flex-shrink-0"
                    >
                      <Edit2 className="h-4 w-4 mr-1.5" />
                      Edit Profile
                    </Button>
                  </div>

                  {/* Completion bar */}
                  <div className="mt-4 rounded-lg bg-muted/50 border border-border p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-foreground">
                        Profile completion
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {completionPct}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${completionPct}%` }}
                        data-ocid="profile.completion_bar"
                      />
                    </div>
                    {completionPct < 100 && (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Add {completionFields.length - filledCount} more field
                        {completionFields.length - filledCount !== 1 ? "s" : ""}{" "}
                        to complete your profile
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveMutation.mutate();
                  }}
                  className="flex flex-col gap-4"
                >
                  {/* Avatar upload */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16 ring-2 ring-border">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} alt="Preview" />
                      ) : displayAvatar ? (
                        <AvatarImage src={displayAvatar} alt={name} />
                      ) : null}
                      <AvatarFallback className="bg-primary/15 text-primary font-bold">
                        {name.slice(0, 2).toUpperCase() || initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label
                        htmlFor="avatar-upload"
                        className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                        data-ocid="profile.avatar_upload"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {avatarFile ? "Change photo" : "Upload photo"}
                      </Label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleAvatarChange}
                      />
                      {avatarFile && (
                        <p className="mt-1 text-xs text-muted-foreground truncate max-w-[160px]">
                          {avatarFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="pname">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-ocid="profile.name_input"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="pbio">Bio</Label>
                    <Textarea
                      id="pbio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      placeholder="Tell buyers about yourself..."
                      data-ocid="profile.bio_textarea"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="ploc">Location</Label>
                      <Input
                        id="ploc"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                        data-ocid="profile.location_input"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="pphone">Phone</Label>
                      <Input
                        id="pphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        data-ocid="profile.phone_input"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      type="submit"
                      disabled={saveMutation.isPending || !name.trim()}
                      data-ocid="profile.save_button"
                    >
                      <Check className="h-4 w-4 mr-1.5" />
                      {saveMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                      data-ocid="profile.cancel_button"
                    >
                      <X className="h-4 w-4 mr-1.5" />
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick link to full listings */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">
          My Listings
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/my-listings" })}
          data-ocid="profile.view_all_listings"
        >
          Manage listings
        </Button>
      </div>
    </div>
  );
}
