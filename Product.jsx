
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Pagination } from '@mui/material'; 


const sortOptions = [
  { name: 'Most Booked', value: 'mostBooked' },
  { name: 'Top Rated', value: 'topRated' },
  { name: 'Newest Services', value: 'newest' },
  { name: 'Price: Low to High', value: 'lowToHigh' },
  { name: 'Price: High to Low', value: 'highToLow' },
];

const filters = [
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '4above', label: '4 stars & above', checked: false },
      { value: '3above', label: '3 stars & above', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: 'low', label: 'Under ₹500', checked: false },
      { value: 'mid', label: '₹500 - ₹1000', checked: false },
      { value: 'high', label: '₹1000 & above', checked: false },
    ],
  },
  {
    id: 'duration',
    name: 'Service Duration',
    options: [
      { value: '30min', label: 'Under 30 mins', checked: false },
      { value: '1hr', label: '30 mins to 1 hour', checked: false },
      { value: '2hr', label: '1 to 2 hours', checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortType, setSortType] = useState('mostBooked');
  const [activeFilters, setActiveFilters] = useState({});
  const param = useParams();
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check for services data passed from MostBookedServices component
  const servicesFromNavigation = location.state?.allServices || [];

  // Fix: Corrected search params handling
  const searchParams = new URLSearchParams(location.search);
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageValue = searchParams.get("page") || 1;
  const stockValue = searchParams.get("stock");

  // Store products state locally (since Redux might not be fully connected)
  const [products, setProducts] = useState({
    content: servicesFromNavigation.length > 0 ? servicesFromNavigation : [],
    totalPages: 1
  });

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Load services data
  useEffect(() => {
    // If we have services from navigation, use those
    if (servicesFromNavigation.length > 0) {
      setProducts({
        content: servicesFromNavigation,
        totalPages: 1
      });
      return;
    }

    // Otherwise try to fetch from Redux/API (this is the original code)
    // This is where you'd dispatch findProducts if Redux is set up
    // For now, let's use fallback data (MostBookedServices)
    
    // Fallback data - replace with your actual data source
    const fallbackServices = [
      {
        id: 1,
        name: "Salon Prime",
        price: 499,
        discount: 30,
        rating: 4.8,
        ratingCount: "2.3k",
        imageUrl: "/api/placeholder/400/320",
        description: "Premium salon services at your doorstep",
        duration: 60
      },
      {
        id: 2,
        name: "Bathroom Cleaning",
        price: 299,
        discount: 20,
        rating: 4.7,
        ratingCount: "1.8k",
        imageUrl: "/api/placeholder/400/320",
        description: "Professional bathroom cleaning services",
        duration: 45
      },
      // Add more fallback services as needed
    ];

    setProducts({
      content: fallbackServices,
      totalPages: 1
    });
  }, [
    servicesFromNavigation,
    param.levelThree,
    discountValue,
    sortValue,
    pageValue,
    stockValue,
    priceValue
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get('sort');
    if (sortParam && sortOptions.find((opt) => opt.value === sortParam)) {
      setSortType(sortParam);
    } else {
      setSortType('mostBooked');
    }

    // Parse URL params to set active filters
    const newActiveFilters = {};
    filters.forEach((section) => {
      const filterValue = params.get(section.id);
      if (filterValue) {
        newActiveFilters[section.id] = filterValue.split(',');
      }
    });
    setActiveFilters(newActiveFilters);
  }, [location.search]);

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', value);
    navigate(`?${searchParams.toString()}`);
  };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.get(sectionId)?.split(',') || [];

    if (filterValues.includes(value)) {
      filterValues = filterValues.filter((item) => item !== value);
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      searchParams.set(sectionId, filterValues.join(','));
    } else {
      searchParams.delete(sectionId);
    }

    navigate(`?${searchParams.toString()}`);
  };

  const isFilterActive = (value, sectionId) => {
    return activeFilters[sectionId]?.includes(value) || false;
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).flat().length;
  };

  const clearAllFilters = () => {
    const searchParams = new URLSearchParams();
    if (sortType !== 'mostBooked') {
      searchParams.set('sort', sortType);
    }
    navigate(`?${searchParams.toString()}`);
  };

  // Use products state rather than direct MostBookedServices reference
  const servicesToShow = products.content || [];

  const sortedServices = [...servicesToShow].sort((a, b) => {
    switch (sortType) {
      case 'topRated':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'lowToHigh':
        return a.price - b.price;
      case 'highToLow':
        return b.price - a.price;
      default:
        return b.ratingCount - a.ratingCount;
    }
  });

  // Filter services based on activeFilters
  const filteredServices = sortedServices.filter((service) => {
    // Check if service passes all active filters
    for (const [sectionId, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue;

      switch (sectionId) {
        case 'rating':
          if (values.includes('4above') && service.rating < 4) return false;
          if (values.includes('3above') && service.rating < 3) return false;
          break;
        case 'price':
          if (values.includes('low') && service.price >= 500) return false;
          if (values.includes('mid') && (service.price < 500 || service.price >= 1000)) return false;
          if (values.includes('high') && service.price < 1000) return false;
          break;
        case 'duration':
          const duration = service.duration || 45; // Default duration if not specified
          if (values.includes('30min') && duration >= 30) return false;
          if (values.includes('1hr') && (duration < 30 || duration >= 60)) return false;
          if (values.includes('2hr') && (duration < 60 || duration >= 120)) return false;
          break;
        default:
          break;
      }
    }
    return true;
  });

  // Handle Book Now button click for each service
  const handleBookNow = (service) => {
    // Navigate to the booking page with service data
    navigate('/product-details', { state: { serviceData: service } });
  };

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile filters */}
                <div className="mt-4 border-t border-gray-200">
                  {getActiveFilterCount() > 0 && (
                    <div className="px-4 py-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {getActiveFilterCount()} {getActiveFilterCount() === 1 ? 'filter' : 'filters'} applied
                      </span>
                      <button
                        onClick={clearAllFilters}
                        className="text-sm font-medium text-purple-600 hover:text-purple-800"
                      >
                        Clear all
                      </button>
                    </div>
                  )}

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={isFilterActive(option.value, section.id)}
                                    onChange={() => handleFilter(option.value, section.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>

                {/* Apply filters button for mobile */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 md:pt-12">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-purple-900">Available Services</h1>
          <div className="flex items-center space-x-2">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {sortOptions.find(option => option.value === sortType)?.name || 'Sort'}
                  <ChevronDownIcon
                    className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSortChange(option.value)}
                            className={classNames(
                              sortType === option.value ? 'font-semibold text-purple-900' : 'text-gray-600',
                              active ? 'bg-gray-100' : '',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-flex items-center px-3 py-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon className="h-5 w-5 mr-1 text-gray-500" aria-hidden="true" />
              <span className="hidden sm:inline-block">Filter</span>
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filters display */}
        {getActiveFilterCount() > 0 && (
          <div className="bg-gray-50 px-4 py-3 rounded-lg my-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {Object.entries(activeFilters).map(([sectionId, values]) =>
              values.map((value) => {
                const section = filters.find((s) => s.id === sectionId);
                const option = section?.options.find((o) => o.value === value);
                return option ? (
                  <button
                    key={`${sectionId}-${value}`}
                    onClick={() => handleFilter(value, sectionId)}
                    className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {option.label}
                    <XMarkIcon className="ml-1 h-4 w-4 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                  </button>
                ) : null;
              })
            )}
            {getActiveFilterCount() > 1 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-purple-600 hover:text-purple-800 ml-auto"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        <section aria-labelledby="services-heading" className="pb-24 pt-6">
          <h2 id="services-heading" className="sr-only">
            Services
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop filters */}
            <form className="hidden lg:block">
              {getActiveFilterCount() > 0 && (
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <span className="text-sm text-gray-500">
                    {getActiveFilterCount()} {getActiveFilterCount() === 1 ? 'filter' : 'filters'} applied
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm font-medium text-purple-600 hover:text-purple-800"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6" defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, idx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${idx}`}
                                name={`${section.id}[]`}
                                value={option.value}
                                type="checkbox"
                                checked={isFilterActive(option.value, section.id)}
                                onChange={() => handleFilter(option.value, section.id)}
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                              <label htmlFor={`filter-${section.id}-${idx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Results grid */}
            <div className="lg:col-span-3">
              {/* Results count and applied filters */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredServices.length}</span> services
                </p>
              </div>

              {/* Service cards grid */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.length > 0 ? (
                  filteredServices.map((item) => (
                    // Pass service data to ProductCard
                    <div key={item.id} onClick={() => handleBookNow(item)} className="cursor-pointer">
                      <ProductCard service={item} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <p className="text-lg text-gray-500">No services match your filters</p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg hover:bg-purple-200"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className='w-full flex justify-center'>
          <div className="py-5">
            <Pagination 
              count={products.totalPages || 1} 
              page={parseInt(pageValue)} 
              color="secondary" 
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </main>

      {/* Sticky filter/sort bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-3 flex items-center justify-between z-20 shadow-lg">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          <span>Filter {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}</span>
        </button>
        <Menu as="div" className="relative inline-block text-left flex-1 ml-3">
          <div>
            <Menu.Button className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium">
              <span>Sort</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute bottom-12 right-0 z-10 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortChange(option.value)}
                        className={classNames(
                          sortType === option.value ? 'font-semibold text-purple-900' : 'text-gray-600',
                          active ? 'bg-gray-100' : '',
                          'block w-full px-4 pyb-2 text-left text-sm'
                        )}
                      >
                        {option.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}