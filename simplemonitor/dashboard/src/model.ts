export type Monitor = {
  virtual_fail_count: number;
  result: string;
  first_failure_time: string;
  last_run_duration: number;
  status: string;
  dependencies: string[];
};

export type apiResponse = {
  generated: string;
  monitors: {
    [key: string]: Monitor;
  };
};
