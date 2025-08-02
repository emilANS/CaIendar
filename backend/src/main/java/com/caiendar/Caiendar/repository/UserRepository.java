package com.caiendar.Caiendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.caiendar.Caiendar.model.User;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    boolean existsByPassword(String password);

    User findByUsernameAndPassword(String username, String password);
}