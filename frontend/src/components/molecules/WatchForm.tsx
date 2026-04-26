import { useState, useEffect } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import type { Watch, WatchCreate } from "@/lib/services/adminService";

interface WatchFormProps {
  watch?: Watch | null;
  onSubmit: (data: WatchCreate) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function WatchForm({ watch, onSubmit, onCancel, isSubmitting }: WatchFormProps) {
  const [formData, setFormData] = useState<WatchCreate>({
    make_name: "",
    model_name: "",
    family_name: "",
    year_produced: "",
    reference: "",
    movement_name: "",
    case_material: "",
    case_diameter: "",
    dial_color: "",
    price_euro: undefined,
    description: "",
    image_url: "",
    functions: "",
    limited_edition: "",
    water_resistance: "",
  });

  useEffect(() => {
    if (watch) {
      setFormData({
        make_name: watch.make_name || "",
        model_name: watch.model_name || "",
        family_name: watch.family_name || "",
        year_produced: watch.year_produced || "",
        reference: watch.reference || "",
        movement_name: watch.movement_name || "",
        case_material: watch.case_material || "",
        case_diameter: watch.case_diameter || "",
        dial_color: watch.dial_color || "",
        price_euro: watch.price_euro || undefined,
        description: watch.description || "",
        image_url: watch.image_url || "",
        functions: watch.functions || "",
        limited_edition: watch.limited_edition || "",
        water_resistance: watch.water_resistance || "",
      });
    }
  }, [watch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price_euro" ? (value ? parseFloat(value) : undefined) : value || null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Make Name *
          </label>
          <Input
            name="make_name"
            value={formData.make_name}
            onChange={handleChange}
            required
            placeholder="e.g., Rolex"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Model Name *
          </label>
          <Input
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            required
            placeholder="e.g., Submariner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Family Name
          </label>
          <Input
            name="family_name"
            value={formData.family_name || ""}
            onChange={handleChange}
            placeholder="e.g., Professional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Reference
          </label>
          <Input
            name="reference"
            value={formData.reference || ""}
            onChange={handleChange}
            placeholder="e.g., 126610LN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Year Produced
          </label>
          <Input
            name="year_produced"
            value={formData.year_produced || ""}
            onChange={handleChange}
            placeholder="e.g., 2020"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Price (EUR)
          </label>
          <Input
            name="price_euro"
            type="number"
            step="0.01"
            value={formData.price_euro || ""}
            onChange={handleChange}
            placeholder="e.g., 9000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Movement
          </label>
          <Input
            name="movement_name"
            value={formData.movement_name || ""}
            onChange={handleChange}
            placeholder="e.g., Automatic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Case Material
          </label>
          <Input
            name="case_material"
            value={formData.case_material || ""}
            onChange={handleChange}
            placeholder="e.g., Stainless Steel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Case Diameter
          </label>
          <Input
            name="case_diameter"
            value={formData.case_diameter || ""}
            onChange={handleChange}
            placeholder="e.g., 41mm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Dial Color
          </label>
          <Input
            name="dial_color"
            value={formData.dial_color || ""}
            onChange={handleChange}
            placeholder="e.g., Black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Water Resistance
          </label>
          <Input
            name="water_resistance"
            value={formData.water_resistance || ""}
            onChange={handleChange}
            placeholder="e.g., 300m"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Limited Edition
          </label>
          <Input
            name="limited_edition"
            value={formData.limited_edition || ""}
            onChange={handleChange}
            placeholder="e.g., Yes"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Functions
        </label>
        <Input
          name="functions"
          value={formData.functions || ""}
          onChange={handleChange}
          placeholder="e.g., Date, Chronograph"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Image URL
        </label>
        <Input
          name="image_url"
          value={formData.image_url || ""}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
          placeholder="Enter watch description..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Saving..." : watch ? "Update Watch" : "Create Watch"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
