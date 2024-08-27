import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WatchProviderProps } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";

interface WatchProvidersProps {
  filteredWatchProviders: WatchProviderProps;
}

const WatchProviders: React.FC<WatchProvidersProps> = ({
  filteredWatchProviders,
}) => {
  const { flatrate = [], rent = [], buy = [], link } = filteredWatchProviders;

  const [selectedTab, setSelectedTab] = useState(
    flatrate.length > 0 ? "stream" : rent.length > 0 ? "rent" : "buy",
  );

  return (
    <div className="mt-12">
      <h5 className="h3-semibold mt-6 text-dark100_light900">Where to Watch</h5>
      <span className="flex small-regular">
        Powered by{" "}
        <Link to={`https://www.justwatch.com/`}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"
            alt="Justwatch"
            className="h-2.5 ml-2 mt-0.5 hover-cursor-pointer"
          />
        </Link>
      </span>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="mt-6"
      >
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          {flatrate.length > 0 && (
            <TabsTrigger value="stream" className="tab">
              Stream
            </TabsTrigger>
          )}
          {rent.length > 0 && (
            <TabsTrigger value="rent" className="tab">
              Rent
            </TabsTrigger>
          )}
          {buy.length > 0 && (
            <TabsTrigger value="buy" className="tab">
              Buy
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="stream" className="my-8">
          <div className="flex flex-wrap gap-4">
            {flatrate.map((provider) => (
              <div
                key={provider.provider_id}
                className="flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="rounded-lg h-16 w-16 object-cover"
                />
                {/* <p className="mt-2 small-medium text-dark300_light700">
                  {provider.provider_name}
                </p> */}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rent" className="my-8">
          <div className="flex flex-wrap gap-4">
            {rent.map((provider) => (
              <div
                key={provider.provider_id}
                className="flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="rounded-lg h-16 w-16 object-cover"
                />
                {/* <p className="mt-2 small-medium text-dark300_light700">
                  {provider.provider_name}
                </p> */}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buy" className="my-8">
          <div className="flex flex-wrap gap-4">
            {buy.map((provider) => (
              <div
                key={provider.provider_id}
                className="flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="rounded-lg h-16 w-16 object-cover"
                />
                {/* <p className="mt-2 small-medium text-dark300_light700">
                  {provider.provider_name}
                </p> */}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {link && (
        <div className="mb-8">
          <Link
            to={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary body-medium"
          >
            <Button size="sm">Watch now</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchProviders;
