export type Monitor = {
  virtual_fail_count: number;
  result: string;
  first_failure_time: Date;
  last_run_duration: number;
  status: string;
  dependencies: string[];
};

export type apiResponse = {
  generated: Date;
  monitors: {
    [key: string]: Monitor;
  };
};
