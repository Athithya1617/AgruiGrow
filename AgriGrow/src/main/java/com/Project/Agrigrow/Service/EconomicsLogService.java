package com.Project.Agrigrow.Service;

import com.Project.Agrigrow.Entity.EconomicsLog;
import com.Project.Agrigrow.Repository.EconomicsLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicsLogService {

    @Autowired
    private EconomicsLogRepository economicsLogRepository;

    public List<EconomicsLog> getAllLogs() {
        // Return latest logs first (sorted by id desc)
        return economicsLogRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public EconomicsLog createLog(EconomicsLog log) {
        return economicsLogRepository.save(log);
    }

    public void deleteLog(Long id) {
        economicsLogRepository.deleteById(id);
    }
}
