import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler } from "lucide-react";

export const SizeGuideDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Ruler className="w-4 h-4 mr-2" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Size Selection Guide</DialogTitle>
          <DialogDescription>
            Find your perfect fit with our detailed size charts
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="clothing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clothing">Clothing</TabsTrigger>
            <TabsTrigger value="shoes">Footwear</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clothing" className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Women's Clothing</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-2 text-left">Size</th>
                      <th className="border border-border p-2 text-left">Bust (in)</th>
                      <th className="border border-border p-2 text-left">Waist (in)</th>
                      <th className="border border-border p-2 text-left">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2 font-medium">XS</td>
                      <td className="border border-border p-2">31-32</td>
                      <td className="border border-border p-2">24-25</td>
                      <td className="border border-border p-2">34-35</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">S</td>
                      <td className="border border-border p-2">33-34</td>
                      <td className="border border-border p-2">26-27</td>
                      <td className="border border-border p-2">36-37</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">M</td>
                      <td className="border border-border p-2">35-36</td>
                      <td className="border border-border p-2">28-29</td>
                      <td className="border border-border p-2">38-39</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">L</td>
                      <td className="border border-border p-2">37-39</td>
                      <td className="border border-border p-2">30-32</td>
                      <td className="border border-border p-2">40-42</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">XL</td>
                      <td className="border border-border p-2">40-42</td>
                      <td className="border border-border p-2">33-35</td>
                      <td className="border border-border p-2">43-45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Men's Clothing</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-2 text-left">Size</th>
                      <th className="border border-border p-2 text-left">Chest (in)</th>
                      <th className="border border-border p-2 text-left">Waist (in)</th>
                      <th className="border border-border p-2 text-left">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2 font-medium">S</td>
                      <td className="border border-border p-2">34-36</td>
                      <td className="border border-border p-2">28-30</td>
                      <td className="border border-border p-2">35-37</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">M</td>
                      <td className="border border-border p-2">38-40</td>
                      <td className="border border-border p-2">32-34</td>
                      <td className="border border-border p-2">38-40</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">L</td>
                      <td className="border border-border p-2">42-44</td>
                      <td className="border border-border p-2">36-38</td>
                      <td className="border border-border p-2">41-43</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">XL</td>
                      <td className="border border-border p-2">46-48</td>
                      <td className="border border-border p-2">40-42</td>
                      <td className="border border-border p-2">44-46</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-medium">XXL</td>
                      <td className="border border-border p-2">50-52</td>
                      <td className="border border-border p-2">44-46</td>
                      <td className="border border-border p-2">47-49</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shoes" className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Women's Footwear</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-2 text-left">US</th>
                      <th className="border border-border p-2 text-left">UK</th>
                      <th className="border border-border p-2 text-left">EU</th>
                      <th className="border border-border p-2 text-left">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">5</td>
                      <td className="border border-border p-2">3</td>
                      <td className="border border-border p-2">35.5</td>
                      <td className="border border-border p-2">8.5</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">6</td>
                      <td className="border border-border p-2">4</td>
                      <td className="border border-border p-2">36.5</td>
                      <td className="border border-border p-2">8.8</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">7</td>
                      <td className="border border-border p-2">5</td>
                      <td className="border border-border p-2">37.5</td>
                      <td className="border border-border p-2">9.25</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">8</td>
                      <td className="border border-border p-2">6</td>
                      <td className="border border-border p-2">38.5</td>
                      <td className="border border-border p-2">9.5</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">9</td>
                      <td className="border border-border p-2">7</td>
                      <td className="border border-border p-2">40</td>
                      <td className="border border-border p-2">9.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Men's Footwear</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-2 text-left">US</th>
                      <th className="border border-border p-2 text-left">UK</th>
                      <th className="border border-border p-2 text-left">EU</th>
                      <th className="border border-border p-2 text-left">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">7</td>
                      <td className="border border-border p-2">6.5</td>
                      <td className="border border-border p-2">40</td>
                      <td className="border border-border p-2">9.5</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">8</td>
                      <td className="border border-border p-2">7.5</td>
                      <td className="border border-border p-2">41</td>
                      <td className="border border-border p-2">9.9</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">9</td>
                      <td className="border border-border p-2">8.5</td>
                      <td className="border border-border p-2">42.5</td>
                      <td className="border border-border p-2">10.25</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">10</td>
                      <td className="border border-border p-2">9.5</td>
                      <td className="border border-border p-2">44</td>
                      <td className="border border-border p-2">10.6</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">11</td>
                      <td className="border border-border p-2">10.5</td>
                      <td className="border border-border p-2">45</td>
                      <td className="border border-border p-2">11</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">How to Measure Your Foot</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Place your foot on a piece of paper</li>
                <li>Mark the longest point of your foot</li>
                <li>Measure the distance from heel to toe</li>
                <li>Compare with the size chart above</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="accessories" className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Ring Sizes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-2 text-left">US</th>
                      <th className="border border-border p-2 text-left">UK</th>
                      <th className="border border-border p-2 text-left">Diameter (mm)</th>
                      <th className="border border-border p-2 text-left">Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">5</td>
                      <td className="border border-border p-2">J</td>
                      <td className="border border-border p-2">15.7</td>
                      <td className="border border-border p-2">49.3</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">6</td>
                      <td className="border border-border p-2">L</td>
                      <td className="border border-border p-2">16.5</td>
                      <td className="border border-border p-2">51.9</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">7</td>
                      <td className="border border-border p-2">N</td>
                      <td className="border border-border p-2">17.3</td>
                      <td className="border border-border p-2">54.4</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">8</td>
                      <td className="border border-border p-2">P</td>
                      <td className="border border-border p-2">18.1</td>
                      <td className="border border-border p-2">57.0</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">9</td>
                      <td className="border border-border p-2">R</td>
                      <td className="border border-border p-2">19.0</td>
                      <td className="border border-border p-2">59.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
